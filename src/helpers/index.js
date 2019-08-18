function ExportDataToJsonFile(data) {
  const blob = new Blob([data], {
    type: 'application/octet-stream'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `download-${new Date().getMilliseconds()}.json`);

  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
  link.dispatchEvent(event);
}

export { ExportDataToJsonFile };
