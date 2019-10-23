using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using static Taumuon.SensorDashboard.Controllers.ConfigurationController;

namespace Taumuon.SensorDashboard
{
    public class ConfigurationHub : Hub
    {
        public IEnumerable<SensorData> Sensors()
        {
            return new List<SensorData>
            {
                new SensorData { Name = "temperature_room_1", Manufacturer = "Acme", HostDevice = "RaspberryPiRoom1", SensorUnits = "℃"},
                new SensorData { Name = "temperature_room_2", Manufacturer = "Acme", HostDevice = "RaspberryPiRoom2", SensorUnits = "℃"},
                new SensorData { Name = "humidity_room_2", Manufacturer = "Acme", HostDevice = "RaspberyPiRoom1", SensorUnits = "%"}
            };
        }
    }
}
