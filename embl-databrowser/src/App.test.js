import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure, mount } from 'enzyme';
import App from './App';
import SelectEle from './components/Select';
import Input from './components/Input';
import expect from 'expect';
import ShallowRenderer from 'react-test-renderer/shallow';
import Adapter from 'enzyme-adapter-react-16';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);
configure({ adapter: new Adapter() });

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Integrate Select Component', () => {
     it('Select Component Rendered Test', () => {
       let renderer = new ShallowRenderer();
       let species = [{name:'homo_sapiens', display_name: 'Human'}];
       let selectedSpecies = 'homo_sapiens';
       renderer.render(<SelectEle id="species" options={species} placeholder={'Please select the species'} selected={selectedSpecies} onChange={() => {}} />);
       let actualElement = renderer.getRenderOutput();
       expect(actualElement.type).toBe('select');
     });
   });

describe('Integrate Input Component', () => {
     it('Input Component Rendered Test', () => {
       let renderer = new ShallowRenderer();
       let species = [{name:'homo_sapiens', display_name: 'Human'}];
       let selectedSpecies = 'homo_sapiens';
       renderer.render(<Input id="gene" className="form-control text-uppercase" value="BRAF" type="text" placeholder="Enter Gene Symbol" name="selectedGeneSymbol" onChange={()=>{}} />);
       let actualElement = renderer.getRenderOutput();
       expect(actualElement.type).toBe('input');
     });
});

describe('Testing Function', () => {
    it('Testing Species Grouping Function', () => {
        const speciesArr = [{name:'homo_sapiens', display_name: 'human'}, {name:'como_sapiens', display_name: 'Cuman'}];
        const mockSort = jest.fn(species => {
            let data = species.reduce((r, e) => {
                let group = e.display_name[0].toUpperCase();
                if(!r[group]) r[group] = {group, children: [e]};
                else r[group].children.push(e);
                return r;
            },{});
            let result = Object.values(data);
            return result;
        });
        const res = mockSort(speciesArr);
        expect(res).toContainEqual({"children": [{"display_name": "human", "name": "homo_sapiens"}], "group": "H"}, {"children": [{"display_name": "Cuman", "name": "como_sapiens"}], "group": "C"});
    });
});

describe('Testing Event', () => {
    it('Test onChange event', () => {
        const onChangeMock = jest.fn();
          const event = {
            preventDefault() {},
            target: { value: 'the-value' }
          };
          const component = shallow(<Input onChange={onChangeMock} />);
          component.find('input').simulate('change', event);
          expect(onChangeMock).toBeCalledWith(event);
    });
});


