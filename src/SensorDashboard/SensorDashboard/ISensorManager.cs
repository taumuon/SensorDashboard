using System;

namespace Taumuon.SensorDashboard
{
    public interface ISensorManager
    {
        IObservable<double> GetSensorObservable(string sensorIdentifier);
    }
}
