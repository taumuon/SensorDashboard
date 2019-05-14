using System;
using System.Threading;

namespace Taumuon.SensorDashboard
{
    public class FakeSensor : ISensor
    {
        private readonly object _newReadingLock = new object();

        private Action<double> _newReading;

        public event Action<double> NewReading
        {
            add { lock (_newReadingLock) { _newReading += value; } }
            remove { lock (_newReadingLock) { _newReading -= value; } }
        }

        private Timer _timer;

        private double _currentValue;
        private Random _random = new Random();

        public FakeSensor(float initialValue)
        {
            _currentValue = initialValue;

            _timer = new Timer(_ =>
            {
                lock (_newReadingLock)
                {
                    _currentValue += (_random.NextDouble() - 0.5);
                    _newReading?.Invoke(_currentValue);
                }
            }, null, 0, 500);
        }
    }
}
