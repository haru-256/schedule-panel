package main

import (
	"context"
	"io"
	"log/slog"
	"net/http"
	"os"
)

func main() {
	opts := &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}
	logger := slog.New(slog.NewTextHandler(os.Stdout, opts))
	ctx := context.Background()
	res, err := http.Get("http://localhost:3000/health")
	if err != nil {
		logger.Log(ctx, slog.LevelError, "Error: %v", err)
		os.Exit(1)
	}
	if res.StatusCode == 200 {
		body, err := io.ReadAll(res.Body)
		if err != nil {
			logger.Log(ctx, slog.LevelError, "Error", "msg", err.Error())
			os.Exit(1)
		}
		logger.Log(ctx, slog.LevelInfo, "Status=200", "res", body)
		os.Exit(0)
	} else {
		logger.Log(ctx, slog.LevelError, "Status!=200", "res", res.Body)
		os.Exit(1)
	}
}
