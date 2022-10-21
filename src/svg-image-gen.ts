import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

const readFileAsDataURL = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = function () {
      reject(reader.error);
    };
  });
};
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('svg-image-gen')
export class SVGImageGen extends LitElement {
  @query('#file_input')
  // @ts-ignore
  fileInput: HTMLInputElement;

  @query('#svgContainer')
  // @ts-ignore
  svgContainer: HTMLDivElement;

  @property({ attribute: false })
  // @ts-ignore
  svgImages: SVGImageElement[];

  @property({})
  createRenderRoot() {
    return this;
  }

  _handleFileSelect() {
    // @ts-ignore
    const file = this.fileInput.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      this.svgContainer.innerHTML = reader.result as string;
      this.svgImages = Array.from(this.svgContainer.querySelectorAll('image'));
    };

    reader.onerror = function () {
      alert(reader.error);
    };
  }

  _handleSVGImageSelect(svgImage: any) {
    return async (event: any) => {
      const result = await readFileAsDataURL(event.currentTarget.files[0]);
      svgImage.setAttribute('xlink:href', result);
      // @ts-ignore
      this.querySelector(`#image-for-input-${svgImage.id}`).src = result;
    };
  }

  _imageLayerInputs() {
    return this.svgImages?.map((svgImage) => {
      return html`
        <div class="grid grid-cols-1 gap-2">
          <label class="block mb-2 text-sm font-medium text-gray-900 " for="file_input">Select Image for ID <i>${
            svgImage.id
          }</i>:</label>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <p><small>Original Chip:</small></p>
              <div class="w-40">
                <img class="w-full block" src='${svgImage.getAttribute(
                  'xlink:href'
                )}'/>
              </div>
            </div>

            <div>
              <p><small>Selected Chip:</small></p>
              <div class="w-40">
                <img id="image-for-input-${
                  svgImage.id
                }" class="w-full block" src='' />
              </div>
            </div>
          </div>
          <input @change="${this._handleSVGImageSelect(
            svgImage
          )}" class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer  focus:outline-none" id="file_input" type="file">
        </div>
      `;
    });
  }

  render() {
    return html`
    <div class="col-span-4 bg-gray-300 p-16">
      <div class="grid grid-cols-1 gap-8 items-start">
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 " for="file_input">Select SVG File to Modify</label>
            <input @change="${
              this._handleFileSelect
            }" class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer  focus:outline-none" id="file_input" type="file">
        </div>
        ${this._imageLayerInputs()}
      </div>
    </div>
      <div class="col-span-8 grid items-center justify-center">
        <div class="w-10/12" id="svgContainer">
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'svg-image-gen': SVGImageGen;
  }
}
