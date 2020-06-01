import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-xml-to-data',
  templateUrl: './xml-to-data.component.html',
  styleUrls: ['./xml-to-data.component.scss']
})
export class XmlToDataComponent implements OnInit {

  clientes: any[] = [];
  showDropZone: boolean = true;
  total: number = 0;
  date: Date = new Date();
  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(ev: any) {
    let workBook = null;
    let jsonData = null;

    const reader = new FileReader();
    const file = ev.addedFiles[0];

    reader.onload = (event: any) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {})
      const dataString = JSON.stringify(jsonData);
      this.orderByUser(dataString);
    };
    reader.readAsBinaryString(file);
  }

  orderByUser(data: any) {
    this.showDropZone = false;
    data = JSON.parse(data);
    const dte: any[] = data['Sheet1'];

    let output: any[] = [];
    let total: number = 0;

    dte.forEach((item) => {
      var existing = output.filter((v, i) => {
        return v["rut"] == item["RUT Receptor"];
      });

      if (existing.length) {
        var existingIndex = output.indexOf(existing[0]);
        output[existingIndex].total += parseInt(item["Monto Total"]);
        output[existingIndex].data = [...output[existingIndex].data, ...[item]];


      } else {
        const data = {
          rut: item['RUT Receptor'],
          nombre: item['Nombre Empresa'],
          total: parseInt(item['Monto Total']),
          data: [item]
        }
        output.push(data);
      }

    });


    for (let cliente of output) {
      total += cliente.total;
    }

    this.clientes = output;
    this.total = total;
    console.log(output)
    console.log(total)
  }

  print(){
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
          <style>
            .title{
              font-size: 22px;
              font-weight: bold;
            }
            .section{
              display: inline-flex;
              justify-content: space-between;
              width: 100%;
              height: 50px; 
            }
            table{
              font-size: 12px;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">
          ${printContents}
        </body>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        
        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
        
        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
                
      </html>`
    );
    popupWin.document.close();
  }

}
