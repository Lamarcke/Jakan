package com.jakan;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;

import java.security.InvalidParameterException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Jakan {
    // For future-proofing
    final String urlBase = "https://api.jikan.moe/";
    final String version = "/v4/";
    final String[] generalTypesBase = {"anime", "manga", "characters", "people", "clubs", "reviews"};
    final String[] weekDaysBase = {"monday", "tuesday", "wednesday", "thursday", "friday", "unknown", "other"};
    final String[] recommendationsList = {"anime", "manga"};
    final List<String> recommendationsTypes = Arrays.asList(recommendationsList);
    final List<String> weekDays = Arrays.asList(weekDaysBase);
    final List<String> generalTypes = Arrays.asList(generalTypesBase);

    public Jakan(){
        Unirest.config().defaultBaseUrl(String.format("%s%s", urlBase, version));
    }

    public Jakan(int versionNumber){
        String version = String.format("%s/v%d/", urlBase, versionNumber);
        Unirest.config().defaultBaseUrl(version);
    }

    public Jakan(String url, int versionNumber){
        String version = String.format("%s/v%d/", url, versionNumber);
        Unirest.config().defaultBaseUrl(version);
    }


    public JsonNode getById(String type, int id){
        if (!generalTypes.contains(type)){
            throw new InvalidParameterException("Invalid type. Check jikan.moe docs.");
        }

        HttpResponse<JsonNode> get = Unirest.get("{type}/{id}")
                .routeParam("id", String.valueOf(id))
                .routeParam("type", type)
                .asJson();

        if (get.getStatus() == 200 && get.getBody() != null){
            return get.getBody();
        }

        return null;
    }

    public JsonNode getById(String type, int id, String extraInfo){
        if (!generalTypes.contains(type)){
            throw new InvalidParameterException("Invalid type. Check jikan.moe docs.");
        }

        HttpResponse<JsonNode> get = Unirest.get("{type}/{id}/{info}")
                .routeParam("id", String.valueOf(id))
                .routeParam("type", type)
                .routeParam("info", extraInfo)
                .asJson();

        if (get.getStatus() == 200 && get.getBody() != null){
            return get.getBody();
        }

        return null;
    }
    // This method accepts values of all kind in the filters param
    public JsonNode getById(String type, int id, String extraInfo, HashMap<String, Object> extraFilters){
        StringBuilder filterParams = new StringBuilder();
        if (!generalTypes.contains(type)){
            throw new InvalidParameterException("Invalid type. Check jikan.moe docs.");
        }

        for (Map.Entry<String, Object> filter : extraFilters.entrySet()){
            String key = filter.getKey();
            Object value = filter.getValue();
            String formatedValue = key + "=" + value;
            filterParams.append(formatedValue);
        }

        HttpResponse<JsonNode> get = Unirest.get("{type}/{id}/{extraInfo}?{filterParams}")
                .routeParam("type", type)
                .routeParam("id", String.valueOf(id))
                .routeParam("extraInfo", extraInfo)
                .routeParam("filterParams", String.valueOf(filterParams))
                .asJson();

        if (get.getStatus() == 200 && get.getBody() != null){
            return get.getBody();
        }

        return null;
    }

    public JsonNode getRecommendations(String type){

        if (!recommendationsTypes.contains(type)){
            throw new InvalidParameterException("Invalid type. Check jikan.moe docs.");
        }

        HttpResponse<JsonNode> get = Unirest.get("recommendations/{type}")
                .routeParam("type", type)
                .asJson();

        if (get.getStatus() == 200 && get.getBody() != null){
            return get.getBody();
        }

        return null;
    }

    public JsonNode getSchedules(){
        HttpResponse<JsonNode> get = Unirest.get("schedules")
                .asJson();

        if (get.getStatus() == 200 && get.getBody() != null){
            return get.getBody();
        }

        return null;
    }

    public JsonNode getSchedules(String weekDay){
        if (!weekDays.contains(weekDay)){
            throw new InvalidParameterException("Invalid week day value. Check jikan.moe docs.");
        }

        HttpResponse<JsonNode> get = Unirest.get("schedules")
                .queryString("filter", weekDay)
                .asJson();

        if (get.getStatus() == 200 && get.getBody() != null){
            return get.getBody();
        }

        return null;
    }

    public JsonNode getTop(String type){
        if (!generalTypes.contains(type)){
            throw new InvalidParameterException("Invalid type. Check jikan.moe docs.");
        }

        HttpResponse<JsonNode> get = Unirest.get("/top/{type}")
                .routeParam("type", type)
                .asJson();

        if (get.getStatus() == 200 && get.getBody() != null){
            return get.getBody();
        }

        return null;
    }

    public JsonNode getTop(String type, HashMap<String, Object> filters){
        StringBuilder filterParams = new StringBuilder();
        if (!generalTypes.contains(type)){
            throw new InvalidParameterException("Invalid type. Check jikan.moe docs.");
        }
        // Loops through extraFilters, and add to filterParams on each iteration.
        for (Map.Entry<String, Object> filter : filters.entrySet()){
            String key = filter.getKey();
            Object value = filter.getValue();
            String formatedValue = key + "=" + value;
            filterParams.append(formatedValue);
        }
        HttpResponse<JsonNode> get = Unirest.get("/top/{type}?{filters}")
                .routeParam("type", type)
                .routeParam("filters", String.valueOf(filterParams))
                .asJson();

        if (get.getStatus() == 200 && get.getBody() != null){
            return get.getBody();
        }

        return null;
    }

    public JsonNode getSeason(){
        // This returns a seasons list. Equivalent to getSeasonsList in jikan.moe
        HttpResponse<JsonNode> get = Unirest.get("seasons")
                .asJson();

        if (get.getStatus() == 200 && get.getBody() != null){
            return get.getBody();
        }

        return null;
    }

    public JsonNode getSeason(String period){
        String[] periodsBase = {"now", "upcoming"};
        List<String> periods = Arrays.asList(periodsBase);

        if (!periods.contains(period)){
            throw new InvalidParameterException("Invalid period. Use either 'now' or 'upcoming'.");
        }

        HttpResponse<JsonNode> get = Unirest.get("seasons/{period}")
                .routeParam("period", period)
                .asJson();

        if (get.getStatus() == 200 && get.getBody() != null){
            return get.getBody();
        }

        return null;

    }
    public JsonNode getSeason(int year, String season){
        // No checking if year or season is valid is implemented.
        // As jikan doesn't provide default allowed values for them in the docs.
        // More testing is needed to implement this cheking.
        HttpResponse<JsonNode> get = Unirest.get("seasons/{year}/{season}")
                .routeParam("year", String.valueOf(year))
                .routeParam("season", season)
                .asJson();

        if (get.getStatus() == 200 && get.getBody() != null){
            return get.getBody();
        }

        return null;

    }

    public JsonNode search(String type, String query){
        if (!generalTypes.contains(type)){
            throw new InvalidParameterException("Invalid type. Check jikan.moe docs.");
        }

        HttpResponse<JsonNode> get = Unirest.get("{type}")
                .routeParam("type", type)
                .queryString("q", query)
                .asJson();

        if (get.getStatus() == 200 && get.getBody() != null){
            return get.getBody();
        }

        return null;
    }

    public JsonNode search(String type, HashMap<String, Object> filters){
        StringBuilder filterParams = new StringBuilder();
        if (!generalTypes.contains(type)){
            throw new InvalidParameterException("Invalid type. Check jikan.moe docs.");
        }

        // First, append query parameter
        filterParams.append("q=").append(filters);

        // Loops through extraFilters, and add to filterParams on each iteration.
        for (Map.Entry<String, Object> filter : filters.entrySet()){

            String key = filter.getKey();
            Object value = filter.getValue();
            String formatedValue = key + "=" + value;
            filterParams.append(formatedValue);
        }

        HttpResponse<JsonNode> get = Unirest.get("{type}?{filterParams}")
                .routeParam("type", type)
                .routeParam("filterParams", String.valueOf(filterParams))
                .asJson();

        if (get.getStatus() == 200 && get.getBody() != null){
            return get.getBody();
        }

        return null;
    }
}
