using System;

namespace Taumuon.SensorDashboard
{
    public interface ISensorManager
    {
        void RegisterCallback(string sensorIdentifier, Action<double> callback);
        void RemoveCallack(string sensorIdentifier, Action<double> callback);
    }
}
