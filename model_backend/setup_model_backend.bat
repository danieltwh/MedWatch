echo Setting up virtual environment...
python -m venv venv

echo Activating virtual environment...
call .\venv\Scripts\activate

echo Installing required packages...
pip install -r requirements.txt