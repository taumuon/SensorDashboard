using System;

namespace Taumuon.SensorDashboard
{
    public interface ISensor
    {
        event Action<double> NewReading;
    }
}
