import React, { Component } from 'react';
// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import API from './api/Api';
import Select from './components/Select';
import Input from './components/Input';
import { AminoAcids } from './aminodictionary';

class App extends Component {
  constructor(props) {
          super(props);
          this.selectedSpecis = '';
          this.geneSymbol = '';
          this.transcriptIds = [];
          this.state= {
              species: [],
              isLoading: false,
              error: false,
              errorMsg: '',
              errorMsgHgsv: '',
              isTextChanged: false,
              selectedSpecies: null,
              selectedGeneSymbol: '',
              selectedProteinSequence: '',
              selectedAminoAcidLetter: '',
              geneStableIdentifier: '',
              selectedHgvs: '',
              transcriptIds: [],
              isValidHgvs: false,
              hgvsTranscriptIds: []
          };
          this.getAllData = this.getAllData.bind(this);
          this.getHgvs = this.getHgvs.bind(this);
          this.selectSpecies = this.selectSpecies.bind(this);
          this.returnErrorMsg = this.returnErrorMsg.bind(this);
      }
  componentDidMount() {
      this.setState({isLoading: true});
      API.get('info/species')
      .then(res => {
        const speciesData = this.groupSpeciesData(res.data.species);
        const data = this.sortArrayByGroup(speciesData);
        this.setState({
          species: data,
          isLoading: false
        });
      }).catch(error => this.setState({
          error,
          isLoading: false
      }));
  }

  sortArrayByGroup(arr) {
    let result = arr.sort(function(a, b) {
        var textA = a.group.toUpperCase();
        var textB = b.group.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    return result;
  }

  groupSpeciesData(species) {
    let data = species.reduce((r, e) => {
        let group = e.display_name[0].toUpperCase();
        if(!r[group]) r[group] = {group, children: [e]};
        else r[group].children.push(e);
        return r;
    },{});
    let result = Object.values(data);
    return result;
  }

  selectSpecies(e){
   this.selectedSpecies = e.target.value;
   this.setState({
    selectedSpecies: this.selectedSpecies,
    isTextChanged: true,
    errorMsg: ''
   });
  }
   getAllData(e) {
    this.setState({
      [e.target.name] : e.target.value.trim().toUpperCase(),
      isTextChanged: true,
      errorMsg: ''
    });
   }

  getHgvs(e) {
    e.preventDefault();
    const hgvsVal = e.target.value.trim();
    this.setState({
        [e.target.name] : hgvsVal,
        isValidHgvs: false,
        errorMsgHgsv: '',
        hgvsTranscriptIds: []
    });
    let isValid = this.validateHgvs(hgvsVal);

    if (isValid) {
        this.setState({isValidHgvs: true, errorMsgHgsv: '' });
        let spilttedHgvsVal = hgvsVal.split('.');
        let spilttedHgvsValArr = spilttedHgvsVal[spilttedHgvsVal.length - 1];
        var aminoValPos = spilttedHgvsValArr.slice(3, spilttedHgvsValArr.length - 3);
        var startAminoAcid = spilttedHgvsValArr.slice(0, 3);
        let aminoacidletterCode = AminoAcids.filter((data) => {
            return data.shortCode === startAminoAcid;
        });
        if(aminoacidletterCode && aminoacidletterCode !== null) {
            this.validateHgvsPosition(hgvsVal, aminoValPos, aminoacidletterCode[0].letterCode);
        }
    } else {
        this.setState({errorMsgHgsv: 'Please enter valid Hgvs'});
    }
  }

  validateHgvsPosition(selectedHgvs, aminoValPos, aminoacidletterCode) {
        const _this = this;
        API.get(`vep/human/hgvs/${selectedHgvs}?content-type=application/json`).then(function (response) {
           // handle success
          if(response.status === 200) {
            response.data.map((n, i) => {
                const filteredArr =  n.transcript_consequences.filter((data) => {
                    return ((data.biotype === 'protein_coding' && data.protein_start !== undefined) && data.protein_start === parseInt(aminoValPos) && data.amino_acids.indexOf(aminoacidletterCode) === 0); // data.amino_acids.indexOf(aminoacidletterCode) === 0 belongs to first letter
                });
                _this.setState({hgvsTranscriptIds: filteredArr, errorMsgHgsv: ''});
                return filteredArr;
            });
          }
        })
        .catch(function (error) {
          _this.setState({errorMsgHgsv: error.response.data.error})
          return;
        });
  }
  validateHgvs(selectedHgvs) {
    let re = /^[A-Z]{4,}[0-9]+[.][0-9]+[:][p][.][ARNDCQEGHILKMFPSTWYV][a-z]{2}[0-9]+[ARNDCQEGHILKMFPSTWYV][a-z]{2}/g; // https://regexr.com/
    return re.test(selectedHgvs);
  }
  checkAllMandatory() {
    const { selectedSpecies, selectedGeneSymbol, selectedProteinSequence, selectedAminoAcidLetter } = this.state;
    if (selectedSpecies!== null && selectedGeneSymbol !== '' && selectedProteinSequence !== '' && selectedAminoAcidLetter !== '') {
       this.setState({error: false, errorMsg: ''});
       return true;
    }
    this.setState({error: true, errorMsg: 'Please fill all fields', isTextChanged: false});
    return false;
  }
  async getData(event) {
    event.preventDefault();
    const isAllFilled = this.checkAllMandatory();
    if(isAllFilled) {
        this.setState({isLoading: true, isTextChanged: true});
        try {
            const stableIdentifierResponse = await API.get(`lookup/symbol/${this.state.selectedSpecies}/${this.state.selectedGeneSymbol}.json?;expand=1`);
            this.setState({geneStableIdentifier: stableIdentifierResponse.data.id, error: false});
            try{
                let sequenceIdentifier = await API.get(`sequence/id/${this.state.geneStableIdentifier}?multiple_sequences=${this.state.selectedProteinSequence};type=protein;content-type=application/json`);
                const returnArr = sequenceIdentifier.data.filter((data) => {
                   return (data.seq.indexOf(this.state.selectedAminoAcidLetter) !== -1);
                });
                if(returnArr.length !== 0){
                    this.setState({ isLoading: false, transcriptIds: returnArr, error: false, isTextChanged: false});
                } else {
                    this.setState({ isLoading: false, transcriptIds: returnArr, error: true, isTextChanged: false, errorMsg: 'The amino acid letter doesnot exist'});
                }
                return;
            } catch(error) {
                this.setState({isLoading: false, error: true, errorMsg: error.response.data.error, isTextChanged: false});
            }
            return stableIdentifierResponse;
        } catch(error) {
            this.setState({isLoading: false, error: true, errorMsg: error.response.data.error, isTextChanged: false});
        }
    }
  }
  returnErrorMsg(txt) {
    return (<div className="alert alert-danger">{txt}</div>)
  }
  generateHgsvTable(datas) {
    let tblData = datas.map((data,i) =>{
            let url = `http://www.ensembl.org/id/${data.transcript_id}`;

            return (<tr key={i}><td><a href={url} className='card-link' rel='noopener noreferrer' title={`Click here to open the details of the transcript ${data.transcript_id}`}  target='_blank'>{data.transcript_id}</a></td></tr>);
    });
    return (<div className='card mt-3'><div className='card-header'>Transcript ID for <span className='font-weight-bold'>{this.state.selectedHgvs}</span></div><div className='card-body'><div className="table-responsive"><table className='table table-striped table-bordered table-hover'><thead><tr><td>Transcript ID</td></tr></thead><tbody>{tblData}</tbody></table></div></div></div>);
  }
  generateTable(datas) {
    let tblData = datas.map((data,i) =>{
        let url = `http://www.ensembl.org/id/${data.id}`;

        return (<tr key={i}><td><a href={url} className='card-link' rel='noopener noreferrer' title={`Click here to open the details of the transcript ${data.id}`}  target='_blank'>{data.id}</a></td></tr>);
    });
    return (<div className='card mt-3'><div className='card-header'>Transcript ID for <span className='font-weight-bold'>{this.state.selectedSpecies}</span> with Gene Symbol <span className='font-weight-bold'>{this.state.selectedGeneSymbol}</span> with amino acid letter <span className='font-weight-bold'>{this.state.selectedAminoAcidLetter}</span> at the position <span className='font-weight-bold'>{this.state.selectedProteinSequence}</span></div><div className='card-body'><div className="table-responsive"><table className='table table-striped table-bordered table-hover'><thead><tr><td>Transcript ID</td></tr></thead><tbody>{tblData}</tbody></table></div></div></div>);
  }

  render() {
    const {species, isLoading, selectedSpecies} = this.state;
    if(isLoading) {
        return (<div className="loader-header"><div className="loader" /></div>);
    }
    return (
      <div className="App container-fluid mb-3 mt-3">
          <form action="#" className="form-horizontal">
              <div className="form-group row">
                <div className="col">
                    <label htmlFor="species" className="col-form-label font-weight-bold">Select Species:</label>
                    <Select id="species" options={species} grouping={'children'} placeholder={'Please select the species'} selected={selectedSpecies} onChange={this.selectSpecies} />
                </div>
                <div className="col">
                    <label htmlFor="gene" className="col-form-label font-weight-bold">Gene Symbol:</label>
                    <Input id="gene" className="form-control text-uppercase" value={this.state.selectedGeneSymbol} type="text" placeholder="Enter Gene Symbol" name="selectedGeneSymbol" onKeyUp={this.getAllData} onChange={this.getAllData} />
                </div>
                <div className="col">
                    <label htmlFor="proteinSequence" className="col-form-label font-weight-bold">Protein Sequence Number:</label>
                    <Input id="proteinSequence" className="form-control" value={this.state.selectedProteinSequence} type="number" name="selectedProteinSequence" placeholder="Enter Protein Sequence Number" onKeyUp={this.getAllData} onChange={this.getAllData} />
                </div>
                <div className="col">
                    <label htmlFor="aminoAcidLetter" className="col-form-label font-weight-bold">Amino Acid Letter:</label>
                    <Input id="aminoAcidLetter" className="form-control text-uppercase" value={this.state.selectedAminoAcidLetter} type="text" maxLength="1" name="selectedAminoAcidLetter" placeholder="Enter an Amino Acid Letter" onKeyUp={this.getAllData} onChange={this.getAllData} />
                </div>
              </div>
              <div className="row">
                <div className="col float-right">
                    <Input type="submit" className="btn btn-primary mb-2 float-right" value="Submit" onClick={this.getData.bind(this)} />
                </div>
              </div>
          </form>
          {this.state.transcriptIds.length !== 0 && !this.state.error && !this.state.isTextChanged && this.state.errorMsg === '' ? this.generateTable(this.state.transcriptIds) : (this.state.error && !this.state.isTextChanged) ? this.returnErrorMsg(this.state.errorMsg) : null}
          <form action="#" className="form-horizontal mt-3">
            <div className="form-group row">
                <label htmlFor="hgsv" className="col-sm-2 col-form-label font-weight-bold">HGVS:</label>
                <div className="col-sm-10">
                    <Input id="hgsv" className="form-control" value={this.state.selectedHgvs} type="text" name="selectedHgvs" placeholder="Enter HGVS" onChange={this.getHgvs} />
                </div>
            </div>
          </form>
          {this.state.isValidHgvs && this.state.hgvsTranscriptIds.length !== 0 && this.state.errorMsgHgsv === '' ? this.generateHgsvTable(this.state.hgvsTranscriptIds) : (this.state.errorMsgHgsv !== '') ? this.returnErrorMsg(this.state.errorMsgHgsv) : null}
      </div>
    );
  }
}

export default App;
