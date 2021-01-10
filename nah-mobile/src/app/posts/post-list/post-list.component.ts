import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { scan } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { AppAlertService } from 'src/app/utils/app-alert.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppRouterNavigateService } from 'src/app/utils/app-router-navigate.service';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  @Input() type: any; // my-posts all topic
  @Input() userId: any;
  @Input() searchKey: any;
  @Input() topicId: any; // if type topic
  showAgendaView = false;
  limit = 20;
  offset = 0;
  loading = false;
  userInfo: any;
  profileId: any;
  postBehavior = new BehaviorSubject<{ opt: any, list: [] }>({ opt: 'list', list: [] });
  list$: Observable<any[]>;
  msSubscription: Subscription;
  defaultImg = "https://static.planetminecraft.com/files/resource_media/screenshot/1506/nah8616087.jpg";
  constructor(
    private storage: Storage,
    public actionSheetController: ActionSheetController,
    private router: Router,
    public appRouter: AppRouterNavigateService,
    private activeRouter: ActivatedRoute, private authS: AuthenticationService,
    public postS: PostService, private alertCtrl: AlertController, private alertS: AppAlertService,
    private socialSharing: SocialSharing) {
    this.msSubscription = this.postS.getChanges().subscribe(message => {
      if (message) {
        this.reload();
      }
    });
  }
  ngOnInit() {
    console.log('activeRouter', this.activeRouter.snapshot.params);
    this.userInfo = this.authS.getUserInfo();
    console.log('this.userInfo', this.userInfo);
    this.list$ = this.postBehavior.asObservable().pipe(
      scan((acc, curr: any) => {
        if (curr.opt && curr.opt.type === 'delete') {
          let index = acc.findIndex((elt) => elt.id === curr.opt.id);
          acc.splice(index, 1);
          return [...acc];
        } else {
          if (this.offset === 0) {
            return [...curr.list];
          } else {
            return [...acc, ...curr.list];
          }
        }
      }, [])
    );
    this.loadPosts();
  }
  loadPosts(infiniteScroll?: any, reload?: any) {
    this.loading = true;
    if (infiniteScroll) {
      this.offset = this.offset + this.limit;
    }
    const payload: any = {};
    if (this.userId) {
      payload.userId = this.userId;
    }
    if (this.topicId) {
      payload.topicId = this.topicId;
    }
    if (this.searchKey) {
      payload.search = this.searchKey;
    }
    payload.type = this.type || this.activeRouter.snapshot.routeConfig.path;
    payload.skip = this.offset;
    payload.take = this.limit;
    this.postS.getPosts(payload).subscribe(res => {
      this.loading = false;
      this.postBehavior.next({ opt: 'list', list: res.data });
      if (infiniteScroll) {
        infiniteScroll.target.complete();
      }
      if (reload && reload.target) {
        reload.target.complete();
        reload.target.disabled = false;
      }
    });
  }
  navDetails(post, navToComments?: boolean) {
    if (navToComments) {
      this.router.navigate(['/posts/details/' + post.id], { queryParams: { comments: 'true' } });
    } else {
      this.router.navigate(['/posts/details/' + post.id]);
    }

  }
  navProfile(user) {
    this.router.navigate(['/user-profile/' + user.id]);
  }

  bookmarkLikeAndDislike(post: any, type = 'bookmark') {
    // post.bookmark = !post.isBookMark;
    // if (post.createdBy.id === this.userInfo.id && type !== 'bookmark') {
    //   return;
    // }
    const postBookmareService = this.postS.bookmarkLikeAndDislike({ postId: post.id, type: type });
    if (type === 'bookmark' && post['bookmark']) {
      this.alertS.presentConfirm('', 'Do you want to Remove bookmark from list?').then(res => {
        if (res) {
          if (post[type]) {
            post[type] = null;
            post[type + 'Count'] = post[type + 'Count'] - 1;
          } else {
            post[type] = {};
            post[type + 'Count'] = post[type + 'Count'] + 1;
          }
          postBookmareService.subscribe(data => {
            if (this.type === 'bookmarks' && type === 'bookmark') {
              this.postBehavior.next({ opt: { type: 'delete', id: post.id }, list: [] });
            }
          });
        }
      });
    } else {
      if (post[type]) {
        post[type] = null;
        post[type + 'Count'] = post[type + 'Count'] - 1;
      } else {
        post[type] = {};
        post[type + 'Count'] = post[type + 'Count'] + 1;
      }

      if (type === 'like') {
        if (post.dislike) {
          post.dislikeCount = post.dislikeCount - 1;
        }
        post.dislike = null;

      } else if (type === 'dislike') {
        if (post.like) {
          post.likeCount = post.likeCount - 1;
        }
        post.like = null;
      }
      postBookmareService.subscribe();

    }

    // this.postS.bookmarkLikeAndDislike({ postId: post.id, type: type }).subscribe(res => {

    // });
  }
  async unBookmark(items: any[], inx, reply) {
    let alert = await this.alertCtrl.create({
      message: 'Do you want to Remove bookmark form list?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            alert.dismiss(false);
            return false;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            alert.dismiss(true);
            return false;
          }
        }
      ]
    });
    return alert;
  }

  reload() {
    this.offset = 0;
    this.postBehavior.next({ opt: 'list', list: [] });
    this.loadPosts();
  }
  doRefresh(reload) {
    this.offset = 0;
    this.postBehavior.next({ opt: 'list', list: [] });
    this.loadPosts(null, reload);
  }
  async presentActionSheet(post) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Edit',
          icon: 'create',
          handler: () => {
            this.editPost(post);
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deletePost(post);
          }
        }
      ]
    });
    await actionSheet.present();
  }
  editPost(post) {
    this.storage.set('postDetails', post).then(res => {
      this.router.navigate(['/posts/create/' + post.id]);
    });
  }
  deletePost(post) {
    this.alertS.presentConfirm(null, 'Are you sure delete this post').then(res => {
      if (res) {
        console.log(res);
        post.isDeleted = 1;
        this.postS.createUpdatePost(post).subscribe(resData => {
          this.postBehavior.next({ opt: { type: 'delete', id: post.id }, list: [] });
        }, error => {

        });
      }
    });
  }
  async shareSocialMedia(post) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class share-icons',
      buttons: [
        {
          text: 'Facebook',
          role: 'destructive',
          icon: 'logo-facebook',
          handler: () => {
            let images = post.photos.map(image => { return image.fullPath });
            if (images.length === 0) {
              images = null;
            }
            let postText = post.title;
            const postUrl = 'http://sayno.mobi/';
            if (post.description) {
              postText = post.description;
            }
            this.socialSharing.shareViaFacebook(postText, images, postUrl).then((res) => {
              console.log('facebook share success -->');

            }).catch((e) => {
              console.log('facebook share failure -->', e);
            });
          }
        }, {
          text: 'Twitter',
          icon: 'logo-twitter',
          handler: () => {
            let images = post.photos.map(image => { return image.fullPath });
            if (images.length === 0) {
              images = null;
            }
            let postText = post.title;
            const postUrl = 'http://sayno.mobi/';
            if (post.description) {
              postText = post.description;
            }
            this.socialSharing.shareViaTwitter(postText, images, postUrl).then((res) => {
              console.log('twitter share success -->');
            }).catch((e) => {
              console.log('twitter share failure -->', e);
            });
          }
        }, {
          text: 'Whatsapp',
          icon: 'logo-whatsapp',
          handler: () => {
            let images = post.photos.map(image => { return image.fullPath });
            if (images.length === 0) {
              images = null;
            }
            let postText = post.title;
            const postUrl = 'http://sayno.mobi/';
            if (post.description) {
              postText = post.description;
            }            
            this.socialSharing.shareViaWhatsApp(postText, images, postUrl).then((res) => {
              console.log('Whatsapp share success -->');
            }).catch((e) => {
              console.log('Whatsapp share failure -->', e);
            });
          }
        },
        {
          text: 'Instagram',
          icon: 'logo-instagram',
          handler: () => {
            let images = post.photos.map(image => { return image.fullPath });
            if (images.length === 0) {
              images = null;
            }
            let postText = post.title;
            if (post.description) {
              postText = post.description;
            }            
            this.socialSharing.shareViaInstagram(postText, images).then((res) => {
              console.log('Instagram share success -->');
            }).catch((e) => {
              console.log('Instagram share failure -->', e);
            });
          }
        }]
    });
    await actionSheet.present();
  }

  ngOnDestroy() {
    this.msSubscription.unsubscribe();
  }

}
