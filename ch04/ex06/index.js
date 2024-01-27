
export function resize(params) {
  let maxWidth = 600;
  let maxHeight = 480;

  if (params && params.maxWidth) {
    maxWidth = params.maxWidth;
  }

  if (params && params.maxHeight) {
    maxHeight = params.maxHeight;
  }

  console.log({ maxWidth, maxHeight });
}

// && と ||のみでresizeを実装
export function resize1(params) {
  let maxWidth = 600;
  let maxHeight = 480;

  maxWidth = (params && params.maxWidth) || maxWidth;
  maxHeight = (params && params.maxHeight) || maxHeight;

  console.log({ maxWidth, maxHeight });
}

// ?? と ?.のみでresizeを実装
export function resize2(params) {
  let maxWidth = 600;
  let maxHeight = 480;

  maxWidth = params?.maxWidth?? maxWidth
  maxHeight = params?.maxHeight?? maxHeight

  console.log({ maxWidth, maxHeight });
}