using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Taumuon.SensorDashboard.Controllers
{
    [Route("api/[controller]")]
    public class ConfigurationController
    {
        [HttpGet("[action]")]
        public IEnumerable<SensorData> Sensors()
        {
            return new List<SensorData>
            {
                new SensorData { Name = "temperature_room_1", Manufacturer = "Acme", HostDevice = "RaspberryPiRoom1", SensorUnits = "℃"},
                new SensorData { Name = "temperature_room_2", Manufacturer = "Acme", HostDevice = "RaspberryPiRoom2", SensorUnits = "℃"},
                new SensorData { Name = "humidity_room_2", Manufacturer = "Acme", HostDevice = "RaspberyPiRoom1", SensorUnits = "%"}
            };
        }

        public class SensorData
        {
            public string Name { get; set; }

            public string Manufacturer { get; set; }

            public string HostDevice { get; set; }

            public string SensorUnits { get; set; }

            // TODO: update rate, sensor error
        }
    }
}
