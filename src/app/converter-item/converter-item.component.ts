import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { ObservableLike } from 'rxjs';

@Component({
  selector: 'app-converter-item',
  templateUrl: './converter-item.component.html',
  styleUrls: ['./converter-item.component.css']
})

export class ConverterItemComponent implements OnInit{
    
  names: any; // list of currency names (for select)

  currency: any; // selected currency

  amount: any; // amount of money to convert

  setCurrency(new_currency:string){

    this.currency = new_currency
    this.changeConverterDataCurrency(new_currency)
  }

  setAmount(event:any){
    const new_amount = event.target.value;
    this.changeConverterDataAmount(new_amount)
  }

  @Input() data:any;

  @Input() result:string;

  @Input() converter_data:any;

  @Output() changeConverterDataEvent = new EventEmitter<any>();

  changeConverterDataAmount(amount:number){
    this.converter_data.amount = amount
    this.changeConverterDataEvent.emit(this.converter_data)
    console.log('cahange '+this.result)
  }

  changeConverterDataCurrency(currency:string){
    this.converter_data.currency = currency
    this.changeConverterDataEvent.emit(this.converter_data)
    console.log('cahange '+this.result)
  }


  ngOnInit(){
    this.names = Object.keys(this.data.rates)
    this.setCurrency(this.converter_data.currency)
  }
}
