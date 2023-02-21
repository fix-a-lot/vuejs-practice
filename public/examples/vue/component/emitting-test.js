export const emittingTest = {
  template: `
    <button type="button" @click="$emit('custom-event:press', '이 메시지는 컴포넌트에서 시작되어...')">이걸 눌러보면?</button>
  `,
  emits: ['custom-event:press'],
  data() {
    return {}
  }
};

export const emittingTest2 = {
  template: `
    <select @change="$emit('custom:event-change', $event.target.value)">
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
  `,
  emits: ['custom:event-change'],
  data() {
    return {}
  }
};

export const emittingTest3 = {
  template: `
    <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
  `,
  props: ['modelValue'],
  emits: ['update:modelValue'],
};

export const emittingTest4 = {
  template: `
    <select :value="selected" @input="$emit('update:selected', $event.target.value)">
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
  `,
  props: ['selected'],
  emits: ['update:selected']
};