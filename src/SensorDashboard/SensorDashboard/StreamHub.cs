using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace Taumuon.SensorDashboard
{
    public class StreamHub : Hub
    {
        private ISensorManager _sensorManager;

        public StreamHub(ISensorManager sensorManager)
        {
            _sensorManager = sensorManager;
        }

        // TODO: investigate SignalR 3 pub-sub
        // TODO: dotnet core 3 async enumerables
        public ChannelReader<SensorReading> StartListening(string sensorIdentifier, CancellationToken cancellationToken)
        {
            var channel = Channel.CreateUnbounded<SensorReading>();

            Action<double> callback = val =>
            {
                if (!cancellationToken.IsCancellationRequested)
                {
                    var sensorReading = new SensorReading
                    {
                        Value = val,
                        Timestamp = DateTime.Now
                    };
                    _ = Write(channel.Writer, sensorReading, cancellationToken);
                }
                // need to do this, or done as part of cancellaton?
                // do in OnDisconnectedAsync ?
                // channel.Writer.TryComplete();
            };

            cancellationToken.Register(() =>
            {
                _sensorManager.RemoveCallack(sensorIdentifier, callback);
            });

            _sensorManager.RegisterCallback(sensorIdentifier, callback);

            return channel.Reader;
        }

        private async Task Write(ChannelWriter<SensorReading> writer, SensorReading val, CancellationToken cancellationToken)
        {
            try
            {
                await writer.WriteAsync(val, cancellationToken);
            }
            catch (Exception ex)
            {
                writer.TryComplete(ex);
            }
        }
    }
}
