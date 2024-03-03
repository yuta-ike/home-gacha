#include <M5Stack.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
#include <WiFiClientSecure.h>

const char* ssid = "SPWH_L11_6C7326";
const char* password = "6L28VUS256";
const char* serverUrl = "https://tmp-home-gacha-pahvxp7a3a-uc.a.run.app/gacha/draw";

Servo myservo;
int pos = 0;
int servoPin = 26;

WiFiClientSecure secureClient;

bool shouldFetchData = true;  // API通信を制御するフラグ

void setup() {
  M5.begin();
  Serial.begin(9600);
  WiFi.begin(ssid, password);
  M5.Lcd.fillScreen(BLACK);
  M5.Lcd.setTextColor(WHITE);
  M5.Lcd.setTextSize(2);

  myservo.attach(servoPin);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to WiFi");
}

bool fetchAndDisplayData() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    secureClient.setInsecure();  // FIXME: サーバー証明書の検証をスキップする
    http.begin(secureClient, serverUrl);
    int httpCode = http.GET();

    M5.Lcd.println(httpCode);

    if (httpCode == 400) {
      Serial.println("400 Not Found: queueが見つかりません");
      http.end();
      return false;
    } else if (httpCode > 0) {
      Serial.println(httpCode);
      String payload = http.getString();
      Serial.println(payload);
      http.end();
      return true;
    } else {
      Serial.println("Error on HTTP request");
      http.end();
      return false;
    }
  }
  return false;
}

void loop() {
  M5.update();  // M5Stackのボタン状態を更新

  // ボタンAでAPI通信のループを開始
  if (M5.BtnA.isPressed()) {
    shouldFetchData = true;
    M5.Lcd.fillScreen(BLACK);  // 画面をクリア
    M5.Lcd.setCursor(0, 0);
    M5.Lcd.println("Fetching Started...");
  }

  // ボタンBでAPI通信のループを停止
  if (M5.BtnB.isPressed()) {
    shouldFetchData = false;
    M5.Lcd.fillScreen(BLACK);  // 画面をクリア
    M5.Lcd.setCursor(0, 0);
    M5.Lcd.println("Fetching Stopped");
  }

  static unsigned long lastTime = 0;
  unsigned long currentTime = millis();

  if (shouldFetchData && currentTime - lastTime > 10000) {  // 10秒ごとに実行
    if (fetchAndDisplayData()) {
      myservo.write(0);
      for (pos = 0; pos <= 160; pos += 1) {
        myservo.write(pos);
        delay(5);
      }
      delay(6000);
      for (pos = 160; pos >= 0; pos -= 1) {
        myservo.write(pos);
        delay(5);
      }
    }
    lastTime = currentTime;
    delay(500);
  }
}
