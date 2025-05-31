using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Minio;
using Minio.ApiEndpoints;
using Minio.DataModel;
using Minio.DataModel.Args;
using Minio.Exceptions;
using System;
using System.Net;
using System.Net.Sockets;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Interface.Models
{
    public class MinioModel
    {
        string minio_address = "localhost:9000";
        string access_key = "L1JMpAXgEv7FVjlQAoXK";
        string secret_key = "YF4BsrtDjYHBvBKYv02eZO3rPZFXmdnzWaGvLW1Y";
        [JsonPropertyName("ImagesData")]
        public List<ImageModel> images { get; set; }



        public async Task<List<ImageModel>> GetImage(string bucketName)
        {
            IMinioClient client = new MinioClient()
                                        .WithCredentials(access_key, secret_key)
                                        .WithEndpoint("localhost", 9000)
                                        .Build();
            try
            {
                ListObjectsArgs listObjectsArgs = new ListObjectsArgs()
                                                        .WithBucket("images");

                var objects = client.ListObjectsEnumAsync(listObjectsArgs).ToBlockingEnumerable().ToList();

                images = new List<ImageModel>();

                foreach (var obj in objects)
                {
                    images.Add(new ImageModel { 
                        ObjectName = obj.Key,
                        ImageUrl = obj.Key
                    });
                }

                return images;
            }
            catch (MinioException e)
            {
                Console.WriteLine("Error occurred: " + e);
                return null;
            }
        }
    }
    public class ImageModel()
    {
        private string url;
        [JsonPropertyName("ImageName")]
        public string ObjectName { get; set; }
        [JsonPropertyName("ImageURL")]
        public string ImageUrl
        {
            get => url; set => url = $"http://localhost:9000/images/{value}";
        }
    }
}