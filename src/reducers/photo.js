const initialState = null;

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'PHOTO_SET':
      return {
        cancelled: payload.cancelled,
        height: payload.height,
        width: payload.width,
        type: payload.type,
        uri: payload.uri,
      };
    case 'PHOTO_DELETE':
      return null;
    default:
      return state;
  }
};
