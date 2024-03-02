from fastapi import FastAPI, HTTPException

app = FastAPI(
    openapi_url="/openapi.json",
)

capsule_toy_queue = []

@app.get("/health")
def health():
    return {"health": "ok"}

@app.post("/gacha/start")
def gacha_start():
    capsule_toy_queue.append("capsule_toy")
    return {"message":"queue append"}

@app.get("/gacha/status")
def gacha_status():
    global capsule_toy_queue
    if len(capsule_toy_queue) == 0:
        raise HTTPException(status_code=404, detail="queueが見つかりません")

    capsule_toy_queue = []
    return {"status": "waiting"}
