#include <M5Stack.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
// #include <BluetoothA2DPSink.h>

const char* ssid = "SPWH_L11_6C7326";
const char* password = "6L28VUS256";
const char* serverUrl = "https://jsonplaceholder.typicode.com/posts/1";

Servo myservo;      // サーボオブジェクトを作成
int pos = 0;        // サーボの現在の位置
int servoPin = 26;  // サーボが接続されているGPIOピン
// int beepPin = 25;   // 音を出すGPIOピン

// QRコードに含めるデータ
// const char *data = "https://example.com";

// BluetoothA2DPSink a2dp_sink;


void setup() {
  M5.begin();
  Serial.begin(9600);
  WiFi.begin(ssid, password);
  M5.Lcd.fillScreen(BLACK);
  M5.Lcd.setTextColor(WHITE);
  M5.Lcd.setTextSize(2);

  myservo.attach(servoPin);  // サーボをGPIO26に接続

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println("Connected to WiFi");
  fetchAndDisplayData();

  // a2dp_sink.start("ESP32_A2DP_Sink");  // Bluetoothデバイスの名前を設定

  // ledcSetup(0, 2000, 8); // チャネル0、2 kHz、8ビット解像度
  // ledcAttachPin(beepPin, 0); // GPIO 26をチャネル0にアタッチ

  // M5.Lcd.qrcode(data,50,10,220,5);

}

void fetchAndDisplayData() {
  if ((WiFi.status() == WL_CONNECTED)) {
    HTTPClient http;
    http.begin(serverUrl);      // Specify the URL
    int httpCode = http.GET();  // Make the request

    if (httpCode > 0) {  // Check for the returning code
      String payload = http.getString();
      Serial.println(httpCode);
      Serial.println(payload);

      DynamicJsonDocument doc(1024);
      deserializeJson(doc, payload);
      String title = doc["title"].as<String>();
      M5.Lcd.setCursor(0, 0);
      M5.Lcd.println(title);
    } else {
      Serial.println("Error on HTTP request");
    }
    http.end();  // Free the resources
  }
}

void loop() {
  bool canRotate = true;
  if(canRotate) {
    myservo.write(0);
    for (pos = 0; pos <= 160; pos += 1) {
      myservo.write(pos);
      delay(5);  // サーボが動くのを待つ
    }
    delay(4000);
    for (pos = 160; pos >= 0; pos -= 1) {
      myservo.write(pos);
      delay(5);  // サーボが動くのを待つ
    }
  }


  // // ビープ音を出す
  // ledcWriteTone(0, 1000); // チャネル0で1 kHzのトーンを生成
  // delay(500); // 500ミリ秒待つ

  // // トーンを停止
  // ledcWriteTone(0, 0); // トーンを停止するには周波数を0に設定
  // delay(500); // 500ミリ秒待つ

  delay(4000);  // 次の動作までの待機時間
}
