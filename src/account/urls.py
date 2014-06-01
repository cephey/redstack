from django.conf.urls import patterns, url
from views import LoginView, logout_view, CheckAuthUserView, ProfileView

urlpatterns = patterns(
    '',
    url(r'^login/$', LoginView.as_view(), name="login"),
    url(r'^logout/$', logout_view, name='logout'),
    url(r'^profile/$', ProfileView.as_view(), name='profile'),

    url(r'^cuau/$', CheckAuthUserView.as_view(), name='check_user_auth_url'),
)