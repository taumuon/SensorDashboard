
using System.Collections.Generic;

namespace Taumuon.SensorDashboard
{
    public interface ISensorConfigManager
    {
        IEnumerable<SensorConfigInfo> Sensors { get; }

        bool TryAdd(SensorConfigInfo sensor);
    }
}
