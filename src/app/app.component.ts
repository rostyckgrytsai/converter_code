import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {getCurrencyService} from '../service/get_currency'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient){}

  data: any;

  item:number=0;
  
  left_result: number = 0;
  left_converter_data:any={currency:"USD", amount: 1}

  right_result: number = 0;
  right_converter_data:any={currency:"UAH", amount: 1}


  setRightResult(){
    this.right_converter_data.amount = this.countCurrency(this.left_converter_data.amount, this.left_converter_data.currency, this.right_converter_data.currency)
    //console.log(`Right   should be: ${this.countCurrency(this.left_converter_data.amount, this.left_converter_data.currency, this.right_converter_data.currency)}`)
  }

  setLeftResult(){
    this.left_converter_data.amount = this.countCurrency(this.right_converter_data.amount, this.right_converter_data.currency, this.left_converter_data.currency)
    //console.log(`Left should be: ${this.countCurrency(this.right_converter_data.amount, this.right_converter_data.currency, this.left_converter_data.currency)}`)
  }

  changeRightConverterData(data:any){
    this.right_converter_data=data
    this. setLeftResult()
  }

  changeLeftConverterData(data:any){
    this.left_converter_data=data
    this.setRightResult()
  }
 
  addToResult(){
    this.left_result+=1
  }

  ngOnInit(){
    getCurrencyService().then(data=>{this.data=data;console.log(data)})
    //this.getCurrency()
  }

  countCurrency(amount:number, from:string, to:string):number{
    const toRate = this.data.rates[from]
    const fromRate = this.data.rates[to]
    const fromInDollars = fromRate * amount
    const result = fromInDollars / toRate
    return parseFloat(result.toFixed(2))
  }

  /*
  getCurrency(){
    //console.log('Getting Currency')
    this.http.get('https://api.exchangerate-api.com/v4/latest/USD').subscribe((response)=>{
      this.data = response
      //console.log(this.data)
    }, (err)=>{console.log(err)})
  }*/


}
