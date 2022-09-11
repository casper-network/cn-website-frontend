//----------------------------------
// Imports
//----------------------------------
import Vue from 'vue';

//----------------------------------
// Private Variables
//----------------------------------
let vuePlugins = {};

export default class VueUtil {
  //----------------------------------
  // Getter Setter
  //----------------------------------
  static set plugins(value) {
    vuePlugins = value;
  }

  static get plugins() {
    return vuePlugins;
  }

  //----------------------------------
  // Public Static Methods
  //----------------------------------
  /**
   * @param component
   * @param target
   * @param props
   * @returns {CombinedVueInstance<any & Vue, object, object, object, Record<never, any>>}
   */
  static createComponent(component, target, props = null) {
    const ExtendedClass = Vue.extend(component);
    const vm = new ExtendedClass({ ...vuePlugins, ...props });
    vm.$mount();
    target.appendChild(vm.$el);
    return vm;
  }
}
