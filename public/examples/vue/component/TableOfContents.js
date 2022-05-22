export const TableOfContents = {
  template: `
    <template v-if="headers">
      <h4>📌 목차</h4>
      <ul>
        <li v-for="item in headers">
          <a :href="item.href">{{item.title}}</a>
        </li>
      </ul>
    </template>
  `,
  props: ['text'],
  data() {
    return {
      headers: null
    };
  },
  mounted() {
    let nodeList = document.querySelectorAll('h2');
    let headers = [];
    nodeList.forEach((ele) => {
      let newId = ele.innerText.replace(/\s/g, '-');
      headers.push({
        title: ele.innerText,
        href: '#' + newId
      });
      ele.setAttribute('id', newId);
      this.headers = headers;
    });
  }
};
