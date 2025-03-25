// Handles large Excel file processing
self.importScripts('https://cdn.sheetjs.com/xlsx-0.19.3/package/dist/xlsx.full.min.js');

self.onmessage = function(e) {
  const { file } = e.data;
  const CHUNK_SIZE = 50000; // Process 50k rows at a time
  
  const reader = new FileReader();
  reader.onload = (event) => {
    const workbook = XLSX.read(event.target.result, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Get total rows
    const range = XLSX.utils.decode_range(sheet['!ref']);
    const totalRows = range.e.r;
    let participantList = [];
    
    // Process in chunks
    for (let startRow = 0; startRow <= totalRows; startRow += CHUNK_SIZE) {
      const endRow = Math.min(startRow + CHUNK_SIZE - 1, totalRows);
      const chunkRange = XLSX.utils.encode_range({
        s: { c: 0, r: startRow },
        e: { c: 0, r: endRow }
      });
      
      const options = { 
        defval: "",
        range: chunkRange,
        header: startRow === 0 ? 1 : 0 // Only read headers on first chunk
      };
      
      const data = XLSX.utils.sheet_to_json(sheet, options);
      
      if (data.length > 0) {
        const firstColumnKey = Object.keys(data[0])[0];
        participantList = participantList.concat(data.map(item => item[firstColumnKey]));
        
        // Send progress update
        self.postMessage({
          type: 'progress',
          progress: Math.floor((endRow / totalRows) * 100)
        });
      }
    }
    
    self.postMessage({ 
      type: 'result',
      participantList 
    });
  };
  
  reader.readAsArrayBuffer(file);
};