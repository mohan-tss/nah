import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from 'src/user/user.entity';
import { MeetingEntity } from 'src/meeting/meeting.entity';
import { GroupFollowEntity } from './group-follows.entity';
// import { UserEntity } from 'src/user/user.entity';
@Entity({ name: 'group' })
export class GroupEntity extends BaseEntity {

    @Column({ length: 100 })
    name: string;

    @Column({ length: 250, nullable: true })
    imageUrl: string;

    // @ManyToOne(type => UserEntity, user => user.groups)
    // createBy: UserEntity;
    @Column({ default: 0 })
    followersCount: number;

    @OneToMany(type => MeetingEntity, meeting => meeting.group, { onDelete: 'CASCADE' })
    meetings: MeetingEntity[];

    @OneToMany(type => GroupFollowEntity, gf => gf.group, { onDelete: 'CASCADE' })
    followers: GroupFollowEntity[];

    @Column()
    createdBy: number;

    @Column({ default: 0 })
    isDeleted: number;

}
