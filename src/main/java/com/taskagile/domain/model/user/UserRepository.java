package com.taskagile.domain.model.user;

public interface UserRepository {
  User findByUsername(String username);

  User findByEmailAddress(String emailAddress);

  void save(User user);
  /*
   * List<User> findByCreatedDateBetween(Date Date); List<User>
   * findByLastNameOrderByFirstNameDesc(String lastName); //스프링 데이터 JPA 제공 기능 //
   * 1. Pagination : 페이징 적용 List<User> findByLastName(String lastName, Pageable
   * pageable); // 2. 메소드 이름으로 활용할수 있는 쿼리 키워드 리스트
   *
   * @Query("select u from User u where u.emailAddress = ?1") User
   * findByEmailAddress(String emailAddress); // 3. 네이티브 쿼리 활용
   *
   * @Query(value="SELECT * FROM USERS WHERE EMAIL_ADDRESS = ?1", nativeQuery =
   * true) User findByEmailAddress(String emailAddress);
   */
}
