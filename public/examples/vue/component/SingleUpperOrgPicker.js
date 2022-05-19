export const SingleUpperOrgPicker = {
  template: `
    <select id="singleUpperOrgPicker" placeholder="상위조직 없음">
      <option value="">상위조직 없음</option>
      <option data-depth="0" value="A1234">A 조직</option>
      <option :selected="savedData === 'A2345'" data-depth="1" value="A2345">A-1 조직</option>
      <option data-depth="2" value="A3456">A-1-Z 조직</option>
      <option data-depth="0" value="B4567">B 조직</option>
      <option data-depth="1" value="B5678">B-1 조직</option>
      <option data-depth="1" value="B6789">B-2 조직</option>
    </select>
  `,
  data() {
    return {
      selected: null,
    };
  },
  props: {
    savedData: {
      type: String,
      default: null,
      required: false
    }
  },
  mounted() {
    let $this = this;
    new TomSelect('#singleUpperOrgPicker', {
      closeAfterSelect: true,
      maxItems: 1,
      hideSelected: false,
      render: {
        option: function(data, escape) {
          let blanks = '';
          for (let i = 0; i < data.depth; i++) {
            blanks += '&nbsp;&nbsp;&nbsp;&nbsp;';
          }
          return '<div>' +
              '<span>' + blanks + '</span>' +
              '<span class="url">' + escape(data.text) + '</span>' +
            '</div>';
        }
      },
      onChange(values) {
        $this.selected = values;
      }
    });
  }
};
