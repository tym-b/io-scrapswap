export function fetchComponentDataBeforeRender(dispatch, components, params) {
  return Promise.all(
    components.reduce((previous, current) => {
      return (current.need || []).concat(previous);
    }, []).map(need => dispatch(need(params)))
  );
}
