(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,a){e.exports=a(52)},25:function(e,t,a){},31:function(e,t,a){},52:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(17),o=a.n(s),l=(a(25),a(10)),i=a.n(l),c=a(18),d=a(3),m=a(4),h=a(5),p=a(8),u=a(6),g=a(7),v=a(2),b=(a(29),a(31),a(19)),f=a.n(b).a.create({baseURL:"http://rest.ensembl.org/",timeout:2e4,headers:{"Content-Type":"application/json"}}),y=function(e){function t(){return Object(m.a)(this,t),Object(p.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(h.a)(t,[{key:"getOptionTag",value:function(e,t){return n.a.createElement("option",{value:e.name,key:t},e.display_name," [ ",e.name," ]")}},{key:"getOptionTags",value:function(e){var t=this;return e.map(function(e,a){return t.getOptionTag(e,a)})}},{key:"getOptions",value:function(){var e=this.props.options;return this.props.grouping?this.getOptgroupTags(e,this.props.grouping):this.getOptionTags(e)}},{key:"getOptgroupTags",value:function(e,t){var a=this;return e.map(function(e,r){var s=a.getOptionTags(e[t]);return n.a.createElement("optgroup",{key:r,label:e.group},s)})}},{key:"render",value:function(){var e=this.getOptions();return n.a.createElement("select",Object.assign({className:"form-control",defaultValue:this.props.selected},this.props),n.a.createElement("option",null,this.props.placeholder),e)}}]),t}(r.Component);y.defaultProps={options:[],grouping:null,selected:null};var C=y,E=function(e){function t(){return Object(m.a)(this,t),Object(p.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return n.a.createElement("input",this.props)}}]),t}(r.Component),S=[{name:"Alanine",shortCode:"Ala",letterCode:"A"},{name:"Cysteine",shortCode:"Cys",letterCode:"C"},{name:"Aspartic Acid",shortCode:"Asp",letterCode:"D"},{name:"Glutamic Acid",shortCode:"Glu",letterCode:"E"},{name:"Phenylalanine",shortCode:"Phe",letterCode:"F"},{name:"Glycine",shortCode:"Gly",letterCode:"G"},{name:"Histidine",shortCode:"His",letterCode:"H"},{name:"Isoleucine",shortCode:"Ile",letterCode:"I"},{name:"Lysine",shortCode:"Lys",letterCode:"K"},{name:"Leucine",shortCode:"Leu",letterCode:"L"},{name:"Methionine",shortCode:"Met",letterCode:"M"},{name:"Asparagine",shortCode:"Asn",letterCode:"N"},{name:"Proline",shortCode:"Pro",letterCode:"P"},{name:"Glutamine",shortCode:"Gln",letterCode:"Q"},{name:"Arginine",shortCode:"Arg",letterCode:"R"},{name:"Serine",shortCode:"Ser",letterCode:"S"},{name:"Threonine",shortCode:"Thr",letterCode:"T"},{name:"Valine",shortCode:"Val",letterCode:"V"},{name:"Tryptophan",shortCode:"Trp",letterCode:"W"},{name:"Tyrosine",shortCode:"Tyr",letterCode:"Y"}],N=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(p.a)(this,Object(u.a)(t).call(this,e))).selectedSpecis="",a.geneSymbol="",a.transcriptIds=[],a.state={species:[],isLoading:!1,error:!1,errorMsg:"",errorMsgHgsv:"",isTextChanged:!1,selectedSpecies:null,selectedGeneSymbol:"",selectedProteinSequence:"",selectedAminoAcidLetter:"",geneStableIdentifier:"",selectedHgvs:"",transcriptIds:[],isValidHgvs:!1,hgvsTranscriptIds:[]},a.getAllData=a.getAllData.bind(Object(v.a)(Object(v.a)(a))),a.getHgvs=a.getHgvs.bind(Object(v.a)(Object(v.a)(a))),a.selectSpecies=a.selectSpecies.bind(Object(v.a)(Object(v.a)(a))),a.returnErrorMsg=a.returnErrorMsg.bind(Object(v.a)(Object(v.a)(a))),a}return Object(g.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({isLoading:!0}),f.get("info/species").then(function(t){var a=e.groupSpeciesData(t.data.species),r=e.sortArrayByGroup(a);e.setState({species:r,isLoading:!1})}).catch(function(t){return e.setState({error:t,isLoading:!1})})}},{key:"sortArrayByGroup",value:function(e){return e.sort(function(e,t){var a=e.group.toUpperCase(),r=t.group.toUpperCase();return a<r?-1:a>r?1:0})}},{key:"groupSpeciesData",value:function(e){var t=e.reduce(function(e,t){var a=t.display_name[0].toUpperCase();return e[a]?e[a].children.push(t):e[a]={group:a,children:[t]},e},{});return Object.values(t)}},{key:"selectSpecies",value:function(e){this.selectedSpecies=e.target.value,this.setState({selectedSpecies:this.selectedSpecies,isTextChanged:!0,errorMsg:""})}},{key:"getAllData",value:function(e){var t;this.setState((t={},Object(d.a)(t,e.target.name,e.target.value.trim().toUpperCase()),Object(d.a)(t,"isTextChanged",!0),Object(d.a)(t,"errorMsg",""),t))}},{key:"getHgvs",value:function(e){var t;e.preventDefault();var a=e.target.value.trim();if(this.setState((t={},Object(d.a)(t,e.target.name,a),Object(d.a)(t,"isValidHgvs",!1),Object(d.a)(t,"errorMsgHgsv",""),Object(d.a)(t,"hgvsTranscriptIds",[]),t)),this.validateHgvs(a)){this.setState({isValidHgvs:!0,errorMsgHgsv:""});var r=a.split("."),n=r[r.length-1],s=n.slice(3,n.length-3),o=n.slice(0,3),l=S.filter(function(e){return e.shortCode===o});l&&null!==l&&this.validateHgvsPosition(a,s,l[0].letterCode)}else this.setState({errorMsgHgsv:"Please enter valid Hgvs"})}},{key:"validateHgvsPosition",value:function(e,t,a){var r=this;f.get("vep/human/hgvs/".concat(e,"?content-type=application/json")).then(function(e){200===e.status&&e.data.map(function(e,n){var s=e.transcript_consequences.filter(function(e){return"protein_coding"===e.biotype&&void 0!==e.protein_start&&e.protein_start===parseInt(t)&&0===e.amino_acids.indexOf(a)});return r.setState({hgvsTranscriptIds:s,errorMsgHgsv:""}),s})}).catch(function(e){r.setState({errorMsgHgsv:e.response.data.error})})}},{key:"validateHgvs",value:function(e){return/^[A-Z]{4,}[0-9]+[.][0-9]+[:][p][.][ARNDCQEGHILKMFPSTWYV][a-z]{2}[0-9]+[ARNDCQEGHILKMFPSTWYV][a-z]{2}/g.test(e)}},{key:"checkAllMandatory",value:function(){var e=this.state,t=e.selectedSpecies,a=e.selectedGeneSymbol,r=e.selectedProteinSequence,n=e.selectedAminoAcidLetter;return null!==t&&""!==a&&""!==r&&""!==n?(this.setState({error:!1,errorMsg:""}),!0):(this.setState({error:!0,errorMsg:"Please fill all fields",isTextChanged:!1}),!1)}},{key:"getData",value:function(){var e=Object(c.a)(i.a.mark(function e(t){var a,r,n,s=this;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!this.checkAllMandatory()){e.next=27;break}return this.setState({isLoading:!0,isTextChanged:!0}),e.prev=4,e.next=7,f.get("lookup/symbol/".concat(this.state.selectedSpecies,"/").concat(this.state.selectedGeneSymbol,".json?;expand=1"));case 7:return a=e.sent,this.setState({geneStableIdentifier:a.data.id,error:!1}),e.prev=9,e.next=12,f.get("sequence/id/".concat(this.state.geneStableIdentifier,"?multiple_sequences=").concat(this.state.selectedProteinSequence,";type=protein;content-type=application/json"));case 12:return r=e.sent,0!==(n=r.data.filter(function(e){return-1!==e.seq.indexOf(s.state.selectedAminoAcidLetter)})).length?this.setState({isLoading:!1,transcriptIds:n,error:!1,isTextChanged:!1}):this.setState({isLoading:!1,transcriptIds:n,error:!0,isTextChanged:!1,errorMsg:"The amino acid letter doesnot exist"}),e.abrupt("return");case 18:e.prev=18,e.t0=e.catch(9),this.setState({isLoading:!1,error:!0,errorMsg:e.t0.response.data.error,isTextChanged:!1});case 21:return e.abrupt("return",a);case 24:e.prev=24,e.t1=e.catch(4),this.setState({isLoading:!1,error:!0,errorMsg:e.t1.response.data.error,isTextChanged:!1});case 27:case"end":return e.stop()}},e,this,[[4,24],[9,18]])}));return function(t){return e.apply(this,arguments)}}()},{key:"returnErrorMsg",value:function(e){return n.a.createElement("div",{className:"alert alert-danger"},e)}},{key:"generateHgsvTable",value:function(e){var t=e.map(function(e,t){var a="http://www.ensembl.org/id/".concat(e.transcript_id);return n.a.createElement("tr",{key:t},n.a.createElement("td",null,n.a.createElement("a",{href:a,className:"card-link",rel:"noopener noreferrer",title:"Click here to open the details of the transcript ".concat(e.transcript_id),target:"_blank"},e.transcript_id)))});return n.a.createElement("div",{className:"card mt-3"},n.a.createElement("div",{className:"card-header"},"Transcript ID for ",n.a.createElement("span",{className:"font-weight-bold"},this.state.selectedHgvs)),n.a.createElement("div",{className:"card-body"},n.a.createElement("div",{className:"table-responsive"},n.a.createElement("table",{className:"table table-striped table-bordered table-hover"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("td",null,"Transcript ID"))),n.a.createElement("tbody",null,t)))))}},{key:"generateTable",value:function(e){var t=e.map(function(e,t){var a="http://www.ensembl.org/id/".concat(e.id);return n.a.createElement("tr",{key:t},n.a.createElement("td",null,n.a.createElement("a",{href:a,className:"card-link",rel:"noopener noreferrer",title:"Click here to open the details of the transcript ".concat(e.id),target:"_blank"},e.id)))});return n.a.createElement("div",{className:"card mt-3"},n.a.createElement("div",{className:"card-header"},"Transcript ID for ",n.a.createElement("span",{className:"font-weight-bold"},this.state.selectedSpecies)," with Gene Symbol ",n.a.createElement("span",{className:"font-weight-bold"},this.state.selectedGeneSymbol)," with amino acid letter ",n.a.createElement("span",{className:"font-weight-bold"},this.state.selectedAminoAcidLetter)," at the position ",n.a.createElement("span",{className:"font-weight-bold"},this.state.selectedProteinSequence)),n.a.createElement("div",{className:"card-body"},n.a.createElement("div",{className:"table-responsive"},n.a.createElement("table",{className:"table table-striped table-bordered table-hover"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("td",null,"Transcript ID"))),n.a.createElement("tbody",null,t)))))}},{key:"render",value:function(){var e=this.state,t=e.species,a=e.isLoading,r=e.selectedSpecies;return a?n.a.createElement("div",{className:"loader-header"},n.a.createElement("div",{className:"loader"})):n.a.createElement("div",{className:"App container-fluid mb-3 mt-3"},n.a.createElement("form",{action:"#",className:"form-horizontal"},n.a.createElement("div",{className:"form-group row"},n.a.createElement("div",{className:"col"},n.a.createElement("label",{htmlFor:"species",className:"col-form-label font-weight-bold"},"Select Species:"),n.a.createElement(C,{id:"species",options:t,grouping:"children",placeholder:"Please select the species",selected:r,onChange:this.selectSpecies})),n.a.createElement("div",{className:"col"},n.a.createElement("label",{htmlFor:"gene",className:"col-form-label font-weight-bold"},"Gene Symbol:"),n.a.createElement(E,{id:"gene",className:"form-control text-uppercase",value:this.state.selectedGeneSymbol,type:"text",placeholder:"Enter Gene Symbol",name:"selectedGeneSymbol",onKeyUp:this.getAllData,onChange:this.getAllData})),n.a.createElement("div",{className:"col"},n.a.createElement("label",{htmlFor:"proteinSequence",className:"col-form-label font-weight-bold"},"Protein Sequence Number:"),n.a.createElement(E,{id:"proteinSequence",className:"form-control",value:this.state.selectedProteinSequence,type:"number",name:"selectedProteinSequence",placeholder:"Enter Protein Sequence Number",onKeyUp:this.getAllData,onChange:this.getAllData})),n.a.createElement("div",{className:"col"},n.a.createElement("label",{htmlFor:"aminoAcidLetter",className:"col-form-label font-weight-bold"},"Amino Acid Letter:"),n.a.createElement(E,{id:"aminoAcidLetter",className:"form-control text-uppercase",value:this.state.selectedAminoAcidLetter,type:"text",maxLength:"1",name:"selectedAminoAcidLetter",placeholder:"Enter an Amino Acid Letter",onKeyUp:this.getAllData,onChange:this.getAllData}))),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col float-right"},n.a.createElement(E,{type:"submit",className:"btn btn-primary mb-2 float-right",value:"Submit",onClick:this.getData.bind(this)})))),0===this.state.transcriptIds.length||this.state.error||this.state.isTextChanged||""!==this.state.errorMsg?this.state.error&&!this.state.isTextChanged?this.returnErrorMsg(this.state.errorMsg):null:this.generateTable(this.state.transcriptIds),n.a.createElement("form",{action:"#",className:"form-horizontal mt-3"},n.a.createElement("div",{className:"form-group row"},n.a.createElement("label",{htmlFor:"hgsv",className:"col-sm-2 col-form-label font-weight-bold"},"HGVS:"),n.a.createElement("div",{className:"col-sm-10"},n.a.createElement(E,{id:"hgsv",className:"form-control",value:this.state.selectedHgvs,type:"text",name:"selectedHgvs",placeholder:"Enter HGVS",onChange:this.getHgvs})))),this.state.isValidHgvs&&0!==this.state.hgvsTranscriptIds.length&&""===this.state.errorMsgHgsv?this.generateHgsvTable(this.state.hgvsTranscriptIds):""!==this.state.errorMsgHgsv?this.returnErrorMsg(this.state.errorMsgHgsv):null)}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(n.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[20,2,1]]]);
//# sourceMappingURL=main.cd27b6c8.chunk.js.map