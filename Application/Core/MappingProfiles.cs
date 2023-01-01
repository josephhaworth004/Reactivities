using AutoMapper;
using Domain;

// For common things like creating, editing etc
namespace Application.Core
{
    public class MappingProfiles : Profile // profile and Auto-Mapper class
    {
        public MappingProfiles()
        {
            // Auto Mapper will look at properties in class Activity and match them to the activity table in the db
            CreateMap<Activity, Activity>();     
        }   
    }
}