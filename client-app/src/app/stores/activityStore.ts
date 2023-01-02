import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  // List of activities of type Activity Array = empty array
  activityRegistry = new Map<string, Activity>(); // string is id as key, Activity object as value
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) =>
    Date.parse(a.date) - Date.parse(b.date));
  }

  // Action called loadActivities
  loadActivities = async () => {
    this.setLoadingInitial(true);
    // async code on a try-catch block
    try {
      const activities = await agent.Activities.list(); // will return a list of activities
      // Update the state
      activities.forEach((activity) => {
        this.setActivity(activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  }

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    }  
    else {
      this.setLoadingInitial(true);
      try { 
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction (() => this.selectedActivity = activity);
        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      } 
    }
  }

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    this.activityRegistry.set(activity.id, activity); /// string is id as key, Activity object as value 
  }

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  }

  // Make the setting of the loading it's own action
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }

  
  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);

        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      })
    }
  }
}
