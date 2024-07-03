// @ts-nocheck

import React from "react";
import styled from "styled-components";
import { Heart, UserPlus, MessageSquareText, Bell } from "lucide-react";
import { useGetNotificationsForUser } from "@/lib/supabase/queries/notifications/getNotificationsForUser";

const NotificationCard = ({ type, user, message, image, comment, index }) => {
  let icon;
  switch (type) {
    case "follow":
      icon = <UserPlus strokeWidth={3} size={16} color="white" />;
      break;
    case "reply":
      icon = (
        <MessageSquareText
          strokeWidth={4}
          size={16}
          color="#191919"
          fill="#191919"
        />
      );
      break;
    case "like":
      icon = <Heart strokeWidth={4} size={16} color="white" fill="white" />;
      break;
    default:
      icon = <Bell strokeWidth={4} size={16} color="white" fill="white" />;
  }

  return (
    <NotificationCardContainer style={{ animationDelay: `${index * 150}ms` }}>
      <Card onClick={() => {}}>
        {type === "like" && (
          <ProfileImage src={user ? user.pfp : ""} alt="Profile" />
        )}
        <TextContainer>
          {type === "like" && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
              }}
            >
              <Username>{user && user.name} </Username>
              <Text>liked your comment</Text>
            </div>
          )}
          {type === "like" && <Message>{comment.content}</Message>}
          {type === "follow" && (
            <>
              <Username>{message}</Username>
              <Message>{user && user.name} started following you</Message>
            </>
          )}
          {type === "reply" && (
            <>
              <Username>
                {user && user.name} {message}
              </Username>
              <Message>{comment && comment.content}</Message>
            </>
          )}
        </TextContainer>
        <IconContainer>{icon}</IconContainer>
        {type === "follow" && <FollowButton>Follow</FollowButton>}
        {image && <img src={image} alt="Notification" />}
      </Card>
    </NotificationCardContainer>
  );
};

export const NotificationsPage = ({ userId }) => {
  const {
    data: notifications,
    isLoading,
    error,
  } = useGetNotificationsForUser(userId);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!notifications || notifications.length === 0) {
    return <Text>No notifications found.</Text>;
  }

  return (
    <Container>
      <Title>Notifications</Title>
      <ScrollView>
        {notifications.map((item, index) => (
          <NotificationCard
            key={item.id}
            index={index}
            type={item.type}
            user={item.users}
            message={item.head}
            image={item.image}
            comment={item.comment}
          />
        ))}
      </ScrollView>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding: 22px;
  padding-top: 15px;
  background-color: #101010;
`;

const Title = styled.h1`
  font-family: "AeonikBold";
  color: white;
  font-size: 24px;
  margin: 12px 0;
`;

const ScrollView = styled.div`
  width: 100%;
  overflow-y: auto;
`;

const NotificationCardContainer = styled.div`
  margin-bottom: 10px;
  background-color: #101010;
  animation: fadeInUp 0.3s ease-in-out forwards;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 11px;
  background-color: #191919;
  border-radius: 13px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 24px;
  margin-right: 10px;
`;

const TextContainer = styled.div`
  flex: 1;
`;

const Username = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: white;
`;

const Text = styled.span`
  font-size: 14px;
  color: white;
`;

const Message = styled.p`
  font-size: 14px;
  color: #777;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const IconContainer = styled.div`
  padding: 8px;
  border-radius: 20px;
  border: 3px solid #323232;
`;

const FollowButton = styled.span`
  color: #4a90e2;
  font-weight: bold;
`;

