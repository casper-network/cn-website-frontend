/**
 * JS Script Loader Utility
 * @author Sandro Ducceschi [eatcodyplay.ch, Switzerland]
 */
export default class ScriptLoader {
  //---------------------------------------------------
  //
  //  API / Public Methods
  //
  //---------------------------------------------------
  static load(url, id = null, async = false, callback = null) {
    if (id !== null) {
      const node = document.querySelector(`#${id}`);
      if (node) {
        node.parentElement.removeChild(node);
      }
    }
    const script = document.createElement('script');
    script.onload = callback;
    script.id = id;
    script.src = url;
    script.async = async;
    document.querySelector('head').appendChild(script);
  }
}
