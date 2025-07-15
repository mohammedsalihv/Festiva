// types/google-maps.d.ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "gmpx-place-autocomplete": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          ref?: React.Ref<PlaceAutocompleteElement>;
          fields?: string[];
          placeholder?: string;
        },
        HTMLElement
      >;
    }
  }

  interface PlaceAutocompleteElement extends HTMLElement {
    inputElement: HTMLInputElement | null;
    getPlace: () => google.maps.places.PlaceResult | undefined;
  }
}

export {};