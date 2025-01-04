/* eslint-disable @typescript-eslint/no-unused-vars */
import { Await, useLoaderData, useNavigate } from '@melodiy/router';
import { useSession } from '@melodiy/ui/hooks';
import { Profile, ProfileHeader } from '@melodiy/ui/profile';
import { Suspense } from 'react';
import { FaSpinner } from 'react-icons/fa';
import * as Tabs from '@radix-ui/react-tabs';
import {
  CollectionCard,
  CollectionCardSize,
  PlaylistCard,
} from '@melodiy/ui/components/Cards';

export default function UserProfile() {
  const { user } = useSession();
  const data = useLoaderData({ from: '/profile/$id' });
  const navigate = useNavigate();

  return (
    <main className="flex flex-col w-full p-2">
      <Suspense
        fallback={
          <ProfileHeader
            id={-1}
            username={<FaSpinner size={23} className="mb-2 animate-spin" />}
            following={0}
            followers={0}
          />
        }
      >
        <Await promise={data.user}>
          {(profile) => {
            if (profile === undefined) {
              console.log('user undefined', profile);
              navigate({ to: '/' });
              return;
            }

            return (
              <>
                <ProfileHeader
                  id={profile.id}
                  username={profile.username}
                  avatar={profile.avatar}
                  following={0}
                  followers={0}
                />

                <div className="">
                  <Tabs.Root className="flex flex-col" defaultValue="playlists">
                    <Tabs.List className="sticky top-0 z-50 flex w-full p-5 border-b rounded-lg gap-x-8 bg-background border-base">
                      <Tabs.Trigger
                        className="data-[state=active]:border-b pb-2 border-primary hover:border-b"
                        value="playlists"
                      >
                        Playlists
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        className="data-[state=active]:border-b pb-2 border-primary hover:border-b"
                        value="favourites"
                      >
                        Favourites
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        className="data-[state=active]:border-b pb-2 border-primary hover:border-b"
                        value="followers"
                      >
                        Followers
                      </Tabs.Trigger>

                      <Tabs.Trigger
                        className="data-[state=active]:border-b pb-2 border-primary hover:border-b"
                        value="following"
                      >
                        Following
                      </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content className="w-full m-5" value="playlists">
                      {user?.username == profile.username && (
                        <span className="flex pb-5">
                          Don't worry only you're able to see your private
                          playlists.
                        </span>
                      )}
                      <div className="flex flex-wrap pb-3 bg-center gap-y-5 gap-x-5">
                        {profile.playlists.length > 0 &&
                          profile.playlists.map((playlist) => (
                            <PlaylistCard
                              id={playlist.id}
                              key={playlist.id}
                              title={playlist.title}
                              imageSrc={playlist.image}
                              owner={profile}
                              size={CollectionCardSize.Large}
                            />
                          ))}
                      </div>
                    </Tabs.Content>

                    <Tabs.Content className="w-full m-5" value="favourites">
                      <div className="flex flex-wrap pb-3 bg-center gap-y-5 gap-x-5">
                        {profile.username} has no favourite's
                        {/* <TopTracksTable tracks={user.topTracks} /> */}
                      </div>
                    </Tabs.Content>

                    <Tabs.Content className="w-full m-5" value="albums">
                      <div className="flex flex-wrap pb-3 bg-center gap-y-5 gap-x-5"></div>
                    </Tabs.Content>

                    <Tabs.Content className="w-full m-5" value="followers">
                      <div className="flex flex-wrap pb-3 bg-center gap-y-5 gap-x-5">
                        Oh no, {profile.username} has no followers why don't you
                        start the trend.
                      </div>
                    </Tabs.Content>

                    <Tabs.Content className="w-full m-5" value="following">
                      <div className="flex flex-wrap pb-3 bg-center gap-y-5 gap-x-5">
                        {profile.username} isn't following anyone
                      </div>
                    </Tabs.Content>
                  </Tabs.Root>
                </div>
              </>
            );
          }}
        </Await>
      </Suspense>
    </main>
  );
}
