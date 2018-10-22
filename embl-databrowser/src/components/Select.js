import React, { Component } from 'react';

class Select extends Component {
    getOptionTag(option, i) {
        return (
          <option value={option.name} key={i}>{option.display_name} [ {option.name} ]</option>
        );
    }

    getOptionTags(options) {
        return options.map((option, i) => {
          return this.getOptionTag(option, i);
        });
    }

    getOptions() {
        var options = this.props.options;
        if (this.props.grouping) {
          return this.getOptgroupTags(options);
        } else {
          return this.getOptionTags(options);
        }
    }
    getOptgroupTags(groups) {
        var optgroups = groups.map((group, t) => {
          var children = this.getOptionTags(group[this.props.grouping]);
          return (
            <optgroup key={t} label={group.group}>
              {children}
            </optgroup>
          );
    });
    return optgroups;
    }

    render() {
        var options = this.getOptions();
        return (
          <select className="form-control" defaultValue={this.props.selected} {...this.props} >
            <option>{this.props.placeholder}</option>
            {options}
          </select>
        );
    }
}
Select.defaultProps = {
      options: [],
      grouping: null,
      selected: null
}

export default Select;