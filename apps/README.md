# Schedule Panel

- `schedule-panel`: ユーザーが触るフロント部分を管理。
- `batch-manager`: BatchやJobを管理。Cloud Batchに投げることでJobを実行する。
- `batch-scheduler`: 定期実行やDAG実行を管理。今実行すべきbatchを洗い出し、それらのbatchに対して `batch-manager` を呼び出してjobを作成する
