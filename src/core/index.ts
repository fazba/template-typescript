
import dayjs from 'dayjs'

export interface ColumeOption {
  label: string;
  key: string;
}

export interface CSVDownloadOption {
  columes: ColumeOption[],
  dateFormatter: (val: Date, colume: ColumeOption) => string
  numberFormatter: (val: number, colume: ColumeOption) => string
}

export class CSVDownload {
  private _option: CSVDownloadOption = {
    columes: [],
    dateFormatter(val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    },
    numberFormatter(val) {
      return val.toString()
    }
  }
  private _header: string;
  constructor(option: Partial<CSVDownloadOption>) {
    Object.assign(this._option, option)
    this._header = this._option.columes.map(e => e.label).join(',')
  }
  download(data: any[], filename: string) {
    let res = this._header
    data.forEach(e => {
      const row: string[] = []
      this._option.columes.forEach(f => {
        const val = e[f.key]
        if (typeof val == 'number') {
          row.push(this._option.numberFormatter(val, f))
        } else if (val instanceof Date) {
          row.push(this._option.dateFormatter(val, f))
        } else {
          row.push(val)
        }
      })
      res += '\r\n' + row.join(',')
    })
    const a = document.createElement('a')
    a.download = filename + '.csv'
    a.href = URL.createObjectURL(new Blob(["\uFEFF" + res], {
      type: "text/csv",
    }));
    a.click()
  }
}