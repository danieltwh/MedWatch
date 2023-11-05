import os
from pathlib import Path

def get_subdirectories(path):
    return [d for d in os.listdir(path) if os.path.isdir(os.path.join(path, d))]

def get_filenames(directory):
    dir_path = Path(directory)
    return [f.name for f in dir_path.iterdir() if f.is_file()]