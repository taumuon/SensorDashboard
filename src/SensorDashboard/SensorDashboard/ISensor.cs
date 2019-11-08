using System;

namespace Taumuon.SensorDashboard
{
    public interface ISensor
    {
        IObservable<double> GetReadings();
    }
}
