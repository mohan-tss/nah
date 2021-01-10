<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start" class="white-color">
      <ion-back-button defaultHref="dashboard"></ion-back-button>
      <ion-img class="ion-padding-r-10 header-logo" src="assets/svg/nah_logo_white.svg"></ion-img>
      <ion-text class="ion-vertical-align-content white-color ion-margin-t-5">
        Post Details
      </ion-text>
    </ion-buttons>
    <ion-row class="profile-settings text-10" *ngIf="post">
      <ion-icon style="cursor: pointer;" name="md-create" *ngIf="isOwner" (click)="editPost(post)" color="light"></ion-icon>
      <ion-icon style="cursor: pointer;" name="md-trash" *ngIf="isOwner" (click)="deletePost(post)" color="light"></ion-icon>
    </ion-row>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-no-padding information">
  <ion-card >
    <app-load-skeleton theme="theme2" limit="1" *ngIf="loading"></app-load-skeleton>
    <ion-row class="post-widget">
      <ion-card class="post-list" *ngIf="post">
        <ion-card-header>
          <ion-row>
            <ion-col size="auto" class="col-avatar" (click)="navProfile(post.createdBy)">
              <ion-avatar class="post-avatar"  >
                <img [src]="post.createdBy.imageUrl" />
              </ion-avatar>
            </ion-col>
            <ion-col class="col-avatar-right">
              <ion-label>
                <ion-text class="text-name">{{ post.createdBy.displayName }}</ion-text>
                <ion-text class="post-stars">
                  <ion-icon name="star" color="warning"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                </ion-text>
                <span class="date">{{ post.createdDate | date: "mediumDate" }}</span>
              </ion-label>
              <p>
                <ion-text class="text-primary" (click)="appRouter.goToTopicDetails(post.topic)">Say No To {{ post.topic.name }}</ion-text>
              </p>
            </ion-col>
          </ion-row>
          <ion-card-title>
            <ion-label>{{ post.title }}</ion-label>
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-text class="post-description" color="dark">
            <p>
              {{ post.description }}
            </p>
          </ion-text>
        </ion-card-content>
  
        <ion-text *ngIf="post.videos && post.videos.length > 0" class="video-title">Videos</ion-text>
        <app-youtube-videos-list [videos]="post.videos" *ngIf="post.videos && post.videos.length > 0"> </app-youtube-videos-list>
        <ion-text *ngIf="post.photos && post.photos.length > 0" class="video-title">Gallery</ion-text>
        <app-post-image-view showAll="true" *ngIf="post.photos && post.photos.length > 0" [images]="post.photos"> </app-post-image-view>
        <ion-footer>
          <ion-text class="post-footer">
            <span (click)="bookmarkLikeAndDislike(post, 'like')"> <ion-icon [ngClass]="{ active: post.like }" name="thumbs-up"></ion-icon> {{ post.likeCount }} </span>
            <span (click)="bookmarkLikeAndDislike(post, 'dislike')"> <ion-icon [ngClass]="{ active: post.dislike }" name="thumbs-down"></ion-icon> {{ post.dislikeCount }} </span>
            <span> <ion-icon name="chatbubbles"></ion-icon> {{ post.commentCount }} </span>
            <span (click)="bookmarkLikeAndDislike(post, 'bookmark')"> <ion-icon name="star" [ngClass]="{ active: post.bookmark }"></ion-icon></span>
            <span> <ion-icon name="share" (click)="shareSocialMedia(post)"></ion-icon></span>
          </ion-text>
        </ion-footer>
      </ion-card>
    </ion-row>
    <ion-row id="comment-box" ></ion-row>
    <ion-row *ngIf="post && post.comments.length > 0" class="ion-padding-l-5 ion-padding-r-5">
      <h3 class="comments-title">COMMENTS({{ post.comments.length }})</h3>
  
      <ion-list class="meeting-list meeting-list-d" *ngFor="let c of post.comments; let cInx = index">
        <ion-grid class="meeting-item ion-no-padding">
          <ion-row class="ion-nowrap ion-align-items-center">
            <ion-col size="auto" class="img-left ion-no-padding" (click)="navProfile(c.createdBy)">
              <ion-avatar class="avater">
                <img [src]="c.createdBy.imageUrl" />
              </ion-avatar>
            </ion-col>
            <ion-col size="7" class="ion-no-padding">
              <!-- <ion-label class="meeting-title" style="display: block;color: #000;">Let's gather our barriors
              </ion-label> -->
              <ion-label class="meeting-sub-title" style="font-weight: bold;">{{ c.createdBy.displayName }} </ion-label>
            </ion-col>
            <ion-col size="auto" class="ion-no-padding ion-text-right">
              <label class="meeting-date" timeago [date]="c.updatedDate"></label>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="ion-no-padding mw-50" size="auto"> </ion-col>
            <ion-col class="ion-no-padding d-flex" >
              <ion-label class="meeting-sub-title">{{ c.comment }}</ion-label>
              <ion-icon size="small" color="danger" *ngIf="userInfo.id === c.createdBy.id" name="trash" (click)="deleteComment(post.comments, cInx, false)" class="ion-padding-r-5" style="cursor: pointer;"></ion-icon>
            </ion-col>
          </ion-row>
          <ion-row class="reply-list meeting-item" *ngFor="let rc of c.replys; let inx = index">
            <label style="float: left;" class="meeting-date" timeago [date]="rc.createdDate"></label>
            <ion-chip class="custom-chip" (click)="navProfile(rc.createdBy)">
              <ion-label class="meeting-sub-title" style="font-weight: bold;">{{ rc.createdBy.displayName }} </ion-label>
              <ion-avatar>
                <img [src]="rc.createdBy.imageUrl" />
              </ion-avatar>
            </ion-chip>
            <ion-col size="12" class="ion-text-right ion-padding-t-0" style="display: flex; align-items: center; justify-content: flex-end;">
              <ion-label class="meeting-sub-title">{{ rc.comment }}</ion-label>
              <ion-icon color="danger" size="small" name="trash" *ngIf="userInfo.id === rc.createdBy.id" (click)="deleteComment(c.replys, inx, true)" class="ion-padding-r-5" style="cursor: pointer;"> </ion-icon>
            </ion-col>
          </ion-row>
          <ion-row>
            <!-- <ion-col>
              <ion-icon size="small" color="danger" *ngIf="userInfo.id === c.createdBy.id" name="trash" (click)="deleteComment(post.comments, cInx, false)" class="ion-padding-r-5" style="cursor: pointer;"></ion-icon>
            </ion-col> -->
            <ion-col (click)="replyComment(c)" class="ion-text-right ion-padding-t-0 ion-padding-b-0" style="color: #f00;">
              <ion-icon name="repeat"></ion-icon>
              <label>Reply</label>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-list>
    </ion-row>

  </ion-card>
</ion-content>
<ion-footer>
  <ion-list class="meeting-list meeting-list-d">
    <ion-grid class="meeting-item ion-no-padding">
      <ion-row *ngIf="replyMsg.id">
        <ion-chip>
          <ion-text color="dark" style="display: inline-block; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
           {{replyMsg.comment}}
          </ion-text>
          <ion-icon (click)="clearReply()" name="close-circle-outline"></ion-icon>
        </ion-chip>
      </ion-row>
      <ion-row class="ion-nowrap ion-align-items-center">
        <ion-col size="auto" class="img-left" (click)="navProfile(userInfo)">
          <ion-avatar class="avater" style="margin: 0 auto;">
            <img [src]="userInfo.imageUrl" />
          </ion-avatar>
        </ion-col>
        <ion-col class="">
          <ion-textarea class="border" style="margin: 0;" rows="1" maxlength="250" #commentMsgEle [(ngModel)]="commentMsg" placeholder="Enter Comments"> </ion-textarea>
        </ion-col>
        <ion-col size="auto" class="ion-text-center">
          <!-- <ion-button size="small" color="danger" (click)="addComment(commentMsg)" [disabled]="!commentMsg">
            Send
          </ion-button> -->
          <ion-icon size="large" color="danger" (click)="addComment(commentMsg)" name="send"> </ion-icon>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-list>
</ion-footer>
