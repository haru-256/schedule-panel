import os

import numpy as np


def run(raise_error: int = 0) -> None:
    print("Hello World from main.py")
    print(np.__version__)
    if raise_error > 0:
        raise RuntimeError("Error from main.py by raise_error=True")

if __name__ == "__main__":
    raise_error = int(os.getenv("RAISE_ERROR", "0"))
    run(raise_error)
