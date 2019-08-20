function ExportDataToFile(data, fileExtension) {
  const blob = new Blob([data], {
    type: 'application/octet-stream'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `download-${new Date().getMilliseconds()}.${fileExtension}`);

  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
  link.dispatchEvent(event);
}

function ValidateURL(url) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + //port
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return pattern.test(url);
}
undefined;

export { ExportDataToFile, ValidateURL };
