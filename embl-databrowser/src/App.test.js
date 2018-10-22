import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
import SelectEle from './components/Select';
import Input from './components/Input';
import expect from 'expect';
import ShallowRenderer from 'react-test-renderer/shallow';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Select Component', () => {
     it('works', () => {
       let renderer = new ShallowRenderer();
       let species = [{name:'homo_sapiens', display_name: 'Human'}];
       let selectedSpecies = 'homo_sapiens';
       renderer.render(<SelectEle id="species" options={species} placeholder={'Please select the species'} selected={selectedSpecies} onChange={() => {}} />);
       let actualElement = renderer.getRenderOutput();
       expect(actualElement.type).toBe('select');
     });
   });

describe('Input Component', () => {
     it('works', () => {
       let renderer = new ShallowRenderer();
       let species = [{name:'homo_sapiens', display_name: 'Human'}];
       let selectedSpecies = 'homo_sapiens';
       renderer.render(<Input id="gene" className="form-control text-uppercase" value="BRAF" type="text" placeholder="Enter Gene Symbol" name="selectedGeneSymbol" onChange={()=>{}} />);
       let actualElement = renderer.getRenderOutput();
       expect(actualElement.type).toBe('input');
     });
   });


