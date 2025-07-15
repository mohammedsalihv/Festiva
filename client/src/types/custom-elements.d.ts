
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmpx-placeautocomplete': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }

  interface PlaceAutocompleteElement extends HTMLElement {
    inputElement: HTMLInputElement;
    getPlace: () => google.maps.places.PlaceResult;
  }
}

export {}; 
