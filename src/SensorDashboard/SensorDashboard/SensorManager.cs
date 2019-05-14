using System;
using System.Collections.Generic;

namespace Taumuon.SensorDashboard
{
    public class SensorManager : ISensorManager
    {
        private readonly Dictionary<string, ISensor> _sensors;

        public SensorManager()
        {
            _sensors = new Dictionary<string, ISensor>
            {
                { "temperature_room_1", new FakeSensor(25) },
                { "temperature_room_2", new FakeSensor(20) },
                { "humidity_room_2", new FakeSensor(45) }
            };
        }

        public void RegisterCallback(string sensorIdentifier, Action<double> callback)
        {
            _sensors[sensorIdentifier].NewReading += callback;
        }

        public void RemoveCallack(string sensorIdentifier, Action<double> callback)
        {
            _sensors[sensorIdentifier].NewReading -= callback;
        }
    }
}
