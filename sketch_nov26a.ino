#include <LiquidCrystal.h>
#include<SoftwareSerial.h>
#define tx 9
#define rx 10
SoftwareSerial HC12(tx,rx);
#define buttonInit 8
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
int inicio, pres=0;

void setup() {
  // put your setup code here, to run once:
  pinMode(buttonInit, INPUT);
  lcd.begin(16, 2);
  lcd.setCursor(0,0);
  lcd.print("game time-pressB");
  lcd.setCursor(0,1);
  inicio=millis();
}

int tempoJogo(){
  static int duracao[]={2, 3, 5, 10, 15}, it=-1;
  static const int tm = 5;
  (++it)%=tm;
  return duracao[it];
}
void loop() {
  // put your main code here, to run repeatedly:
  
  if(!digitalRead(buttonInit) && !pres){
    pres=!pres;
  }
  else if(digitalRead(buttonInit) && pres){
    pres=!pres;
    lcd.setCursor(0, 1);
    lcd.print("                ");
    lcd.setCursor(0, 1);
    lcd.print("select: "); lcd.print(tempoJogo()); lcd.print(" min");
  }
  else if(!digitalRead(buttonInit) && pres){
    if((millis()-inicio)>= 750){
      //muda de estado
      while(1);
    }
  }
  else{
    inicio=millis();
  }
}
