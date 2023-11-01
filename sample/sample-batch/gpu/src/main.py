import os

import numpy as np
import torch


def run(raise_error: int = 0) -> None:
    print("Hello World from main.py")
    print(np.__version__)
    print(f"torch.cuda.is_available() = {torch.cuda.is_available()}")
    print(f"torch.cuda.device_count() = {torch.cuda.device_count()}")
    print(f"torch.backends.cudnn.is_available() = {torch.backends.cudnn.is_available()}")
    print(f"torch.backends.cudnn.version() = {torch.backends.cudnn.version()}")
    if raise_error > 0:
        raise RuntimeError("Error from main.py by raise_error=True")

if __name__ == "__main__":
    raise_error = int(os.getenv("RAISE_ERROR", "0"))
    run(raise_error)
