import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Select from './Select';
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() })
describe("Test the Select Component", () => {
    it('Select renders without crashing', () => {
      const species = [{name:'homo_sapiens', display_name: 'Human'}];
      let selectedSpecies = 'homo_sapiens';
      const wrapper = shallow(<Select id="species" options={species} placeholder={'Please select the species'} selected={selectedSpecies} onChange={() => {}} />);
      expect(wrapper.prop('options')).toBe(species);
    });
    it('Select renders with properties', () => {
          const species = [{name:'homo_sapiens', display_name: 'Human'}];
          let selectedSpecies = 'homo_sapiens';
          const wrapper = shallow(<Select id="species" options={species} placeholder={'Please select the species'} selected={selectedSpecies} onChange={() => {}} />);
          expect(wrapper.prop('placeholder')).toBe('Please select the species');
    });
    it('Testing option values', () => {
              const species = [{name:'homo_sapiens', display_name: 'Human'}];
              let selectedSpecies = 'homo_sapiens';
              const wrapper = shallow(<Select id="species" options={species} placeholder={'Please select the species'} selected={selectedSpecies} onChange={() => {}} />);
              const instance = wrapper.instance();
              instance.getOptions();
              expect(wrapper.find("select").props("children").defaultValue).toBe(species[0].name);
              expect(wrapper.find("select").props("children").selected).toBe(species[0].name);
              expect(wrapper.find("select").props("children").options[0].display_name).toBe(species[0].display_name);
    });
    it('Snapshot testing', () =>{
        const species = [{name:'homo_sapiens', display_name: 'Human'}];
        const selectedSpecies = 'homo_sapiens';
        const tree = renderer.create(
          <Select id="species" options={species} placeholder={'Please select the species'} selected={selectedSpecies} onChange={() => {}} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
